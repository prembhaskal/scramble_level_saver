'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SpellathonSection from '../components/spellathonsection';
import ScrambleSection from '../components/scramblesection';
import { FormData } from '../page';
import AnswersSection from '../components/answerssection';

export default function CreateLevel() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    spellathon: {
      sixLetters: '',
      centerLetter: '',
      description: '',
    },
    scramble: {
      words: ['', '', '', ''],
      circledLetters: [[], [], [], []],
      sentence: '',
    },
    answers: {
      ans: '',
    },
  });

  useEffect(() => {
    // Redirect to home if not authenticated
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }
    
    if (session) {
      fetchLastLevel();
    }
  }, [session, status, router]);

  const fetchLastLevel = async () => {
    try {
      const response = await fetch('/api/last-level');
      const data = await response.json();
      setCurrentLevel(data.lastLevel + 1);
    } catch (error) {
      console.error('Error fetching last level:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/save-level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: currentLevel,
          ...formData,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save level');
      }
  
      // Add a success message
      alert('Level saved successfully!');
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error saving level:', error);
      alert('Failed to save level');
    }
  };

  // Show loading while authentication status is being determined
  if (status === 'loading') {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Create Level {currentLevel}</h1>

      <SpellathonSection
        data={formData.spellathon}
        onChange={(spellathonData) =>
          setFormData({ ...formData, spellathon: spellathonData })
        }
      />
      <ScrambleSection
        data={formData.scramble}
        onChange={(scrambleData) =>
          setFormData({ ...formData, scramble: scrambleData })
        }
      />

      <AnswersSection
        data={formData.answers}
        onChange={(answersData) => 
          setFormData({ ...formData, answers: answersData})
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Level
      </button>
    </div>
  );
}
