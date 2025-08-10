// app/api/last-level/route.ts
import { NextResponse } from 'next/server';
import { getLastLevel } from '../../lib/levelStorage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== 'pbhaskal@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
