import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-navy-deep">Admin page not found</h1>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white"
        >
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
