export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your email and we will send a secure magic link.
        </p>

        <form action="/api/auth/request-link" method="POST" className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <button
            className="w-full rounded-lg bg-slate-950 px-4 py-2 text-white"
            type="submit"
          >
            Send magic link
          </button>
        </form>
      </div>
    </main>
  );
}
