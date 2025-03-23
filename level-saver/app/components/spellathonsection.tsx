import HexagonWithLetters from './hexagonwithletters';

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
            value={data.sixLetters.toUpperCase()}
            onChange={(e) => onChange({ ...data, sixLetters: e.target.value.toUpperCase() })}
            className="border p-2 rounded w-30"
          />
          <input
            type="text"
            maxLength={1}
            placeholder="Enter center letter"
            value={data.centerLetter.toUpperCase()}
            onChange={(e) => onChange({ ...data, centerLetter: e.target.value.toUpperCase() })}
            className="border p-2 rounded w-10"
          />
        </div>
        <div className="grid gap-4 mb-0">
          <HexagonWithLetters letters={data.sixLetters.split('')} centerLetter={data.centerLetter} />
        </div>
      </div>
    );
  }
  