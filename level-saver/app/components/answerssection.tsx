interface AnswersProps {
    data: {
      ans: string;
    };
    onChange: (data: { ans: string; }) => void;
  }
  
  export default function AnswersSection({ data, onChange }: AnswersProps) {
    return (
      <div className="mb-8">
        <h2 className="text-xl mb-4">Answers</h2>
        <div className="grid gap-4">
          <textarea
            value={data.ans}
            onChange={(e) => onChange({ ...data, ans: e.target.value })}
            maxLength={1000}
            placeholder="Answers"
            className="border p-2 rounded w-full h-32"
          />
        </div>
      </div>
    );
  }
  