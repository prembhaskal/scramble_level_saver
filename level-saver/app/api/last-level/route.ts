// app/api/last-level/route.ts
import { NextResponse } from 'next/server';
import { getLastLevel } from '../../lib/levelStorage';

export async function GET() {
  try {
    const lastLevel = await getLastLevel();
    return NextResponse.json({ lastLevel });
  } catch (error) {
    console.error('Error fetching last level:', error);
    return NextResponse.json(
      { error: 'Failed to fetch last level' },
      { status: 500 }
    );
  }
}
