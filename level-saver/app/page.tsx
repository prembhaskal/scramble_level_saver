'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Level {
  id: number;
  number: number;
}

export default function Home() {
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const response = await fetch('/api/levels');
      const data = await response.json();
      setLevels(data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Levels</h1>
      <Link
        href="/create-level"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Level
      </Link>

      <div className="grid gap-4 mt-4">
        {levels.map((level) => (
          <div key={level.id} className="border p-4 rounded">
            Level {level.number}
          </div>
        ))}
      </div>
    </div>
  );
}
