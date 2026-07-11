export default function StepSeparator({
  marginTop = 0,
  marginBottom = 0,
}: {
  marginTop?: number;
  marginBottom?: number;
}) {
  return (
    <div
      className="border-t border-slate-400"
      style={{
        marginTop,
        marginBottom,
      }}
    />
  );
}
