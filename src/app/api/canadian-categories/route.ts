import { NextResponse } from 'next/server'
import { getCanadianBrandCategories } from '@/lib/db'

export async function GET() {
  try {
    const categories = await getCanadianBrandCategories()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
