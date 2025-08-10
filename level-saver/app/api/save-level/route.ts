// app/api/save-level/route.ts
import { NextResponse } from 'next/server';
import { saveLevel } from '../../lib/levelStorage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
// import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== 'pbhaskal@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const savedLevel = await saveLevel(body);

    /* Disable automatic save to drive.
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (session?.accessToken) {
      try {
        // Save to Google Drive
        const drive = google.drive({
          version: 'v3',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        
        const fileMetadata = {
          name: `level-${Date.now()}.json`,
          mimeType: 'application/json',
        };
        
        const media = {
          mimeType: 'application/json',
          body: JSON.stringify(savedLevel),
        };
        
        await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id',
        });
      } catch (driveError) {
        console.error('Error saving to Google Drive:', driveError);
        // Don't fail the whole request if Google Drive save fails
      }
    }
    */

    return NextResponse.json(savedLevel);
  } catch (error) {
    console.error('Error saving level:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save level' },
      { status: 500 }
    );
  }
}
