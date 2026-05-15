export default function PaySuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3">
        <div className="text-5xl">🎉</div>
        <h2 className="text-lg font-semibold text-gray-900">Payment Successful!</h2>
        <p className="text-sm text-gray-500">
          Your payment has been received. You&apos;ll get a confirmation email shortly.
        </p>
      </div>
    </div>
  );
}