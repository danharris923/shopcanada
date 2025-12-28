import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // Read at runtime, not module load
    const adminPassword = process.env.ADMIN_PASSWORD || 'shopcanada2024'

    // Debug: log if env var exists (not the value)
    console.log('ADMIN_PASSWORD env exists:', !!process.env.ADMIN_PASSWORD)
    console.log('Password length received:', password?.length)
    console.log('Expected length:', adminPassword.length)

    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({
      error: 'Invalid password',
      debug: {
        envExists: !!process.env.ADMIN_PASSWORD,
        receivedLength: password?.length,
        expectedLength: adminPassword.length
      }
    }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
