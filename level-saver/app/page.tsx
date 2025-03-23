'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Level {
  level: number;
  spellathon: {
    sixLetters: string;
    centerLetter: string;
  };
  scramble: {
    words: string[];
    circledLetters: number[][];
    sentence: string;
  };
}

export default function Home() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/levels');
      if (!response.ok) {
        throw new Error('Failed to fetch levels');
      }
      const data = await response.json();
      setLevels(data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (levelNumber: number) => {
    if (!confirm('Are you sure you want to delete this level?')) {
      return;
    }

    try {
      const response = await fetch(`/api/levels/${levelNumber}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete level');
      }

      // Refresh the levels list
      fetchLevels();
      alert('Level deleted successfully!');
    } catch (error) {
      console.error('Error deleting level:', error);
      alert('Failed to delete level');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Game Levels</h1>
        <Link 
          href="/create-level" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Level
        </Link>
      </div>

      {levels.length === 0 ? (
        <p className="text-gray-500">No levels created yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <div 
              key={level.level} 
              className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold">Level {level.level}</h2>
                <div className="space-x-2">
                  <button
                    onClick={() => router.push(`/edit-level/${level.level}`)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(level.level)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Spellathon</h3>
                <p>Letters: {level.spellathon.sixLetters}</p>
                <p>Center: {level.spellathon.centerLetter}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Scramble</h3>
                <div className="space-y-1">
                  {level.scramble.words.map((word, index) => (
                    <p key={index}>
                      Word {index + 1}: {word}
                      <span className="text-sm text-gray-500 ml-2">
                        (Circled: {level.scramble.circledLetters[index].map(i => i + 1).join(', ')})
                      </span>
                    </p>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Sentence: {level.scramble.sentence}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
