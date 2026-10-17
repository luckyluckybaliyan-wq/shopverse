export default function Spinner() {
  return (
    <div className="flex justify-center py-16" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-brand" />
    </div>
  );
}
