'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import SpellathonSection from '../../components/spellathonsection';
import ScrambleSection from '../../components/scramblesection';
import {FormData} from '../../types/level';

interface Props {
  params: Promise<{
    levelId: string;
  }>;
}

export default function EditLevel(props: Props) {
  const params = use(props.params);
  const router = useRouter();
  const levelId = parseInt(params.levelId);
  const [isLoading, setIsLoading] = useState(true);
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
    fetchLevel();
  }, [levelId]);

  const fetchLevel = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/levels/${levelId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch level');
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching level:', error);
      alert('Failed to fetch level');
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/levels/${levelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: levelId,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update level');
      }

      alert('Level updated successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error updating level:', error);
      alert('Failed to update level');
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
        <h1 className="text-2xl font-bold">Edit Level {levelId}</h1>
        <button
          onClick={() => router.push('/')}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

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

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Level
        </button>
      </div>
    </div>
  );
}
