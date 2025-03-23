'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SpellathonSection from '../components/spellathonsection';
import ScrambleSection from '../components/scramblesection';
import { FormData } from '../types/level';

export default function CreateLevel() {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    spellathon: {
      sixLetters: '',
      centerLetter: '',
    },
    scramble: {
      words: ['', '', '', ''],
      circledLetters: [[], [], [], []],
      sentence: '',
    },
  });

  useEffect(() => {
    fetchLastLevel();
  }, []);

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

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Level
      </button>
    </div>
  );
}
