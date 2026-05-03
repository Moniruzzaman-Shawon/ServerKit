import { NextResponse } from 'next/server'
import { getActivity } from '@/lib/db'

export async function GET() {
  try {
    return NextResponse.json(getActivity(30))
  } catch (err) {
    return NextResponse.json([], { status: 500 })
  }
}
