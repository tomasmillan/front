import { useState } from "react";
import StarOutline from "@/components/icons/StarOutline";
import StarSolid from "@/components/icons/StarSolid";
import { primary } from "@/lib/colors";

export default function StarsRating({
  size = 'md',
  defaultHowMany = 0,
  disabled,
  onChange
}) {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const five = [1, 2, 3, 4, 5];

  function handleStarClick(n) {
    if (disabled) {
      return;
    }
    setHowMany(n);
    onChange(n);
  }

  return (
    <div className="inline-flex gap-1 items-center">
      {five.map((n) => (
        <button
          key={n}
          disabled={disabled}
          onClick={() => handleStarClick(n)}
          className={`p-0 border-0 inline-block bg-transparent ${size === 'md' ? 'h-5 w-5' : 'h-4 w-4'} ${!disabled ? 'cursor-pointer' : ''} text-${primary}`}
        >
          {howMany >= n ? <StarSolid /> : <StarOutline />}
        </button>
      ))}
    </div>
  );
}
