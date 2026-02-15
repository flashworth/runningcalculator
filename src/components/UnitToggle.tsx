interface UnitToggleOption {
  value: string;
  label: string;
}

interface UnitToggleProps {
  options: UnitToggleOption[];
  selected: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

export default function UnitToggle({ options, selected, onChange, ariaLabel }: UnitToggleProps) {
  return (
    <div className="unit-toggle" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={selected === option.value}
          className={`unit-toggle__option${selected === option.value ? ' unit-toggle__option--active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
