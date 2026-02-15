interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button type="button" className="reset-button" onClick={onClick}>
      Reset
    </button>
  );
}
