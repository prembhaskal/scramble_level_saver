'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

interface GoogleDriveSaveProps {
  levelData: any;
  fileName: string;
}

export default function GoogleDriveSave({ levelData, fileName }: GoogleDriveSaveProps) {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveToDrive = async () => {
    if (!session) {
      await signIn('google');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/google-drive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          content: levelData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save to Google Drive');
      }

      const data = await response.json();
      console.log('Saved to Google Drive:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4">
      {session ? (
        <div>
          <button
            onClick={handleSaveToDrive}
            disabled={isSaving}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save to Google Drive'}
          </button>
          <button
            onClick={() => signOut()}
            className="ml-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google to Save
        </button>
      )}
      {error && (
        <p className="mt-2 text-red-500">{error}</p>
      )}
    </div>
  );
} 