import React, { useContext, useMemo, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'

const initialBotMessage = {
  role: 'assistant',
  text: 'Hi! I\'m AIVaidya. Describe your symptoms and optionally add a photo. I\'ll suggest likely conditions and which specialist to consult. This is not medical advice.'
}

const AIDoctor = () => {
  const { backendUrl } = useContext(AppContext)
  const apiBase = backendUrl || ''
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([initialBotMessage])
  const [input, setInput] = useState('')
  const [images, setImages] = useState([]) // File[]
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  const previewUrls = useMemo(() => images.map(f => URL.createObjectURL(f)), [images])

  const onPickImages = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const accepted = files.slice(0, 3)
    setImages(accepted)
  }

  const send = async () => {
    const text = input.trim()
    if (!text && images.length === 0) return

    setMessages(m => [...m, { role: 'user', text, images: previewUrls }])
    setInput('')
    setLoading(true)

    try {
      const form = new FormData()
      form.append('symptoms', text || 'No text provided')
      images.forEach(img => form.append('images', img))

      const resp = await fetch(`${apiBase}/api/ai/diagnose`, {
        method: 'POST',
        body: form
      })

      // Handle non-OK status with graceful message extraction
      if (!resp.ok) {
        let message = `Request failed (${resp.status})`
        try {
          const errJson = await resp.json()
          if (errJson && errJson.message) message = errJson.message
        } catch {}
        throw new Error(message)
      }

      const data = await resp.json()

      if (!data.success) {
        throw new Error(data.message || 'AI request failed')
      }

      const content = data.data
      const pretty = typeof content === 'string' ? content : JSON.stringify(content, null, 2)
      setMessages(m => [...m, { role: 'assistant', text: pretty }])
    } catch (err) {
      const msg = err?.message || 'Sorry, I could not process that right now.'
      setMessages(m => [...m, { role: 'assistant', text: msg }])
    } finally {
      setLoading(false)
      setImages([])
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Open AIVaidya"
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
      >
        {/* Stethoscope Icon */}
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 8c-1.103 0-2 .897-2 2v1c0 1.103.897 2 2 2s2-.897 2-2v-1c0-1.103-.897-2-2-2zm0 3c-.551 0-1-.449-1-1v-1c0-.551.449-1 1-1s1 .449 1 1v1c0 .551-.449 1-1 1z"/>
          <path d="M17 11v1c0 2.757-2.243 5-5 5s-5-2.243-5-5V6c0-1.654 1.346-3 3-3h1V2h-1C7.243 2 5 4.243 5 7v5c0 3.309 2.691 6 6 6v3H8v2h8v-2h-3v-3c3.309 0 6-2.691 6-6v-1h-2z"/>
        </svg>
        <span>{open ? 'Close AIVaidya' : 'AIVaidya'}</span>
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[380px] max-h-[70vh] bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 8c-1.103 0-2 .897-2 2v1c0 1.103.897 2 2 2s2-.897 2-2v-1c0-1.103-.897-2-2-2zm0 3c-.551 0-1-.449-1-1v-1c0-.551.449-1 1-1s1 .449 1 1v1c0 .551-.449 1-1 1z"/>
              <path d="M17 11v1c0 2.757-2.243 5-5 5s-5-2.243-5-5V6c0-1.654 1.346-3 3-3h1V2h-1C7.243 2 5 4.243 5 7v5c0 3.309 2.691 6 6 6v3H8v2h8v-2h-3v-3c3.309 0 6-2.691 6-6v-1h-2z"/>
            </svg>
            <span>AIVaidya</span>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-3 text-sm">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block whitespace-pre-wrap px-3 py-2 rounded-2xl ${m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'}`}>
                  {m.text}
                </div>
                {m.images && m.images.length > 0 && (
                  <div className="mt-2 flex gap-2 justify-end">
                    {m.images.map((url, i) => (
                      <img key={i} src={url} alt="uploaded" className="w-14 h-14 rounded object-cover border" />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500">Thinking…</div>}
          </div>
          <div className="p-3 border-t">
            {previewUrls.length > 0 && (
              <div className="flex gap-2 mb-2">
                {previewUrls.map((url, i) => (
                  <img key={i} src={url} alt="preview" className="w-10 h-10 rounded object-cover border" />
                ))}
                <button onClick={() => { setImages([]); if (fileRef.current) fileRef.current.value = '' }} className="text-xs text-gray-500 underline">Clear</button>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && send()}
                  placeholder="Describe symptoms..."
                  className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={onPickImages} className="hidden" />
                <button 
                  onClick={() => fileRef.current?.click()} 
                  className="px-3 py-2 border rounded-xl text-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
                  title="Add photo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">Photo</span>
                </button>
              </div>
              <button 
                onClick={send} 
                disabled={loading} 
                className="w-full bg-primary text-white px-4 py-2.5 rounded-xl disabled:opacity-60 hover:bg-primary/90 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-gray-500">For guidance only. Not a medical diagnosis.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default AIDoctor


