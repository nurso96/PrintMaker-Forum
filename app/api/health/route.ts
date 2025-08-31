import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health check
    const response = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'PrintMaker-Forum',
      version: '1.0.0'
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Service health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}