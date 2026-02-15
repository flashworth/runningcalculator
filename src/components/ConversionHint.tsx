interface ConversionHintProps {
  hint: string | null;
}

export default function ConversionHint({ hint }: ConversionHintProps) {
  if (!hint) return null;

  return (
    <span className="conversion-hint">{hint}</span>
  );
}
