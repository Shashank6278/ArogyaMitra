import { GoogleGenerativeAI } from "@google/generative-ai";

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build proper Gemini SDK input: a single user message with parts
    const parts = [
      { text: buildPrompt(symptoms) },
      ...files.map(imageToPart)
    ];

    const result = await model.generateContent([
      { role: "user", parts }
    ]);
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
    console.error("AIDiagnose error:", error);
    return res.status(500).json({ success: false, message: "Failed to get AI guidance." });
  }
};

export { diagnose };


