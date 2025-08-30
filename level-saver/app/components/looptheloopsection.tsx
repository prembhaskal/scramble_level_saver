import { LoopTheLoop } from '../types/level';

interface LoopTheLoopProps {
  data: LoopTheLoop;
  onChange: (data: LoopTheLoop) => void;
}

export default function LoopTheLoopSection({ data, onChange }: LoopTheLoopProps) {
  // Initialize empty 7x7 grid if not present
  const initializeGrid = (): string[][] => {
    if (data.grid && data.grid.length === 7 && data.grid.every(row => row.length === 7)) {
      return data.grid;
    }
    return Array(7).fill(null).map(() => Array(7).fill(''));
  };

  const grid = initializeGrid();

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    // Validate input - only allow empty string, 0, 1, 2, 3
    if (value !== '' && !['0', '1', '2', '3'].includes(value)) {
      return; // Ignore invalid input
    }

    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return value;
        }
        return cell;
      })
    );

    onChange({ ...data, grid: newGrid });
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl mb-4">Loop the Loop</h2>
      <div className="inline-block border-2 border-gray-400 p-2 bg-white">
        <div className="grid grid-cols-7 gap-1">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className="w-10 h-10 border border-gray-300 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-3]?"
                placeholder=""
              />
            ))
          )}
        </div>
      </div>
      <div className="text-sm text-gray-600 mt-2">
        Enter 0, 1, 2, or 3 in each cell. Leave empty for blank cells.
      </div>
    </div>
  );
}
