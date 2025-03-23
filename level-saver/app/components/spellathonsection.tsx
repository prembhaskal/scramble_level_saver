interface SpellathonProps {
    data: {
      sixLetters: string;
      centerLetter: string;
    };
    onChange: (data: { sixLetters: string; centerLetter: string }) => void;
  }
  
  export default function SpellathonSection({ data, onChange }: SpellathonProps) {
    return (
      <div className="mb-8">
        <h2 className="text-xl mb-4">Spellathon</h2>
        <div className="grid gap-4">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6 letters"
            value={data.sixLetters}
            onChange={(e) => onChange({ ...data, sixLetters: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            maxLength={1}
            placeholder="Enter center letter"
            value={data.centerLetter}
            onChange={(e) => onChange({ ...data, centerLetter: e.target.value })}
            className="border p-2 rounded w-20"
          />
        </div>
      </div>
    );
  }
  