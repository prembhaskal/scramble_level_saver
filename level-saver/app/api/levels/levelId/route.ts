import { NextResponse } from 'next/server';
import { getLevel, updateLevel, deleteLevel } from '@/app/lib/fileUtils';

export async function GET(
  request: Request,
  { params }: { params: { levelId: string } }
) {
  try {
    const level = await getLevel(parseInt(params.levelId));
    if (!level) {
      return NextResponse.json(
        { error: 'Level not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(level);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch level' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { levelId: string } }
) {
  try {
    const body = await request.json();
    const updatedLevel = await updateLevel(parseInt(params.levelId), body);
    return NextResponse.json(updatedLevel);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update level' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { levelId: string } }
) {
  try {
    await deleteLevel(parseInt(params.levelId));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete level' },
      { status: 500 }
    );
  }
}
