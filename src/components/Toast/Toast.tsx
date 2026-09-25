type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed right-5 top-5 z-50 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  );
}