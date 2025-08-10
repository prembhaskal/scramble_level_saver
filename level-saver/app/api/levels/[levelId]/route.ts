import { NextResponse } from 'next/server';
import { getLevel, updateLevel, deleteLevel } from '@/app/lib/levelStorage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';

export async function GET(request: Request, props: { params: Promise<{ levelId: string }> }) {
  const params = await props.params;
  const levelId = await params.levelId;
  
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== 'pbhaskal@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const level = await getLevel(parseInt(levelId));
    if (!level) {
      return NextResponse.json(
        { error: 'Level not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(level);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch level ' + error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, props: { params: Promise<{ levelId: string }> }) {
  const params = await props.params;
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== 'pbhaskal@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updatedLevel = await updateLevel(parseInt(params.levelId), body);
    return NextResponse.json(updatedLevel);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update level ' + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ levelId: string }> }) {
  const params = await props.params;
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== 'pbhaskal@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await deleteLevel(parseInt(params.levelId));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete level ' + error },
      { status: 500 }
    );
  }
}
