// app/api/save-level/route.ts
import { NextResponse } from 'next/server';
import { saveLevel } from '../../lib/fileUtils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const savedLevel = await saveLevel(body);
    return NextResponse.json(savedLevel);
  } catch (error) {
    console.error('Error saving level:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save level' },
      { status: 500 }
    );
  }
}
