import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Helper to build a strong prompt for medical triage (not a diagnosis)
const buildPrompt = (symptomsText) => `You are AIVaidya, a careful medical triage assistant powered by advanced AI and ML algorithms. You are NOT a medical professional and do not provide diagnoses. You help users understand possible conditions and which specialist to consult.

Task:
- Consider the user's symptoms and the optional photo.
- Return safe, non-diagnostic guidance with likelihood-ranked hypotheses.
- Be concise and consumer-friendly. Avoid alarming language.
- Always include a disclaimer that this is not medical advice and suggest seeking professional care.

Required JSON response schema (no extra text):
{
  "conditionHypotheses": [
    { "name": string, "rationale": string }
  ],
  "urgency": "emergency" | "urgent" | "soon" | "routine",
  "recommendedSpeciality": string,
  "homeCare": string,
  "redFlags": string[],
  "disclaimer": string
}

User reported symptoms:
${symptomsText}`;

// Convert a single uploaded image buffer into a Gemini inlineData part
const imageToPart = (file) => {
  const mimeType = file.mimetype || "image/jpeg";
  const data = file.buffer.toString("base64");
  return { inlineData: { data, mimeType } };
};

const diagnose = async (req, res) => {
  try {
    const { symptoms } = req.body;
    const files = req.files || [];

    if (!symptoms || !symptoms.trim()) {
      return res.status(400).json({ success: false, message: "Please describe your symptoms." });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ success: false, message: "Server missing GOOGLE_API_KEY" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    // Prefer stable "-latest" aliases to avoid version-specific 404s from v1beta
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
        responseMimeType: "application/json"
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }
      ]
    });
    
    // Quick probe: if the selected model 404s for v1beta, fall back to a widely-supported one
    try {
      await model.generateContent({ contents: [{ role: "user", parts: [{ text: "ping" }] }] });
    } catch (e) {
      if (String(e?.message || "").includes("404") || String(e?.message || "").includes("not found")) {
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      } else {
        throw e;
      }
    }

    // Build proper Gemini SDK input: a single user message with parts
    const parts = [
      { text: buildPrompt(symptoms) },
      ...files.map(imageToPart)
    ];

    // Use object form to avoid SDK version differences
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts
        }
      ]
    });

    const text = result.response.text().trim();

    // Try to parse the JSON. If it fails, wrap it.
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }

    return res.json({ success: true, data: payload });
  } catch (error) {
    // Surface more helpful error info to the client while avoiding sensitive data
    const status = error?.response?.status || 500;
    const details = error?.message || "Unknown error";
    const blocked = error?.response?.candidates?.[0]?.finishReason || null;
    console.error("AIDiagnose error:", details);
    return res.status(status).json({ 
      success: false, 
      message: blocked ? `Safety blocked: ${blocked}` : details
    });
  }
};

// Lightweight endpoint to validate API connectivity and key configuration
const aiSelfTest = async (req, res) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ success: false, message: "Server missing GOOGLE_API_KEY" });
    }
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", generationConfig: { responseMimeType: "application/json" } });
    try {
      await model.generateContent({ contents: [{ role: "user", parts: [{ text: "ping" }] }] });
    } catch (e) {
      if (String(e?.message || "").includes("404") || String(e?.message || "").includes("not found")) {
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", generationConfig: { responseMimeType: "application/json" } });
      } else {
        throw e;
      }
    }
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Return {\"ok\":true}" }] }]
    });
    const txt = result.response.text().trim();
    return res.json({ success: true, echo: txt });
  } catch (error) {
    const details = error?.message || "Unknown error";
    console.error("aiSelfTest error:", details);
    return res.status(500).json({ success: false, message: details });
  }
};

export { diagnose };
export { aiSelfTest };
