import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt kosong' },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY belum diset' },
        { status: 500 }
      )
    }

    const res = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // 🔥 MODEL TERBARU
          messages: [
            {
              role: 'system',
              content:
                'Kamu adalah AI financial assistant. Jawaban harus singkat, jelas, dan mudah dipahami. Gunakan bahasa Indonesia santai tapi informatif.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    )

    const data = await res.json()

    console.log('STATUS:', res.status)
    console.log('RESPONSE:', data)

    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            data?.error ||
            'Groq API error',
        },
        { status: res.status }
      )
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      'Tidak ada jawaban dari AI'

    return NextResponse.json({ reply })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    )
  }
}