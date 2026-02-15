interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export default function ToggleSwitch({ label, checked, onChange, id }: ToggleSwitchProps) {
  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label" htmlFor={id}>
        {label}
      </label>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        className={`toggle-switch__track${checked ? ' toggle-switch__track--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle-switch__thumb" />
      </button>
    </div>
  );
}
