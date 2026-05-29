export default function CheckEmailPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="mt-2 text-sm text-slate-600">
          If the email is allowed, a secure login link will be sent shortly.
        </p>
      </div>
    </main>
  );
}
