import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { accessToken } = session;
    const { fileName, content } = await request.json();

    const drive = google.drive({
      version: 'v3',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const fileMetadata = {
      name: fileName,
      mimeType: 'application/json',
    };

    const media = {
      mimeType: 'application/json',
      body: JSON.stringify(content),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    return NextResponse.json({ fileId: response.data.id });
  } catch (error) {
    console.error('Error saving to Google Drive:', error);
    return NextResponse.json(
      { error: 'Failed to save to Google Drive' },
      { status: 500 }
    );
  }
} 