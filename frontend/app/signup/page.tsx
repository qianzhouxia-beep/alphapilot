// AlphaPilot Signup — M2 mock auth (Boss pick A, 2026-06-06)

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const r = await signup(email, password, fullName);
    setSubmitting(false);
    if (!r.ok) {
      setError(r.error ?? "Signup failed");
      return;
    }
    router.push("/");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
      <div className="glass-strong w-full rounded-2xl p-8">
        <div className="mb-6 flex items-center gap-3">
          <img src="/logo.png" alt="AlphaPilot" className="h-10 w-10 rounded-xl" />
          <div>
            <h1 className="text-[24px] font-semibold leading-tight">Create account</h1>
            <p className="text-[12px] text-[#9FB0C7]">Start with 7-day free trial</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            label="Full name"
            type="text"
            value={fullName}
            onChange={setFullName}
            placeholder="Jane Doe"
            autoComplete="name"
          />
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="8+ characters"
            autoComplete="new-password"
          />

          {error && (
            <div className="rounded-lg border border-[#FF5D5D] bg-[rgba(255,93,93,0.08)] p-3 text-[12px] text-[#FF5D5D]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#4DA3FF] py-2.5 text-[14px] font-semibold text-[#00315b] transition-colors hover:bg-[#7ddeff] disabled:opacity-50"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-[12px] text-[#9FB0C7]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#4DA3FF] hover:underline">
            Sign in
          </Link>
        </div>

        <p className="mt-6 text-center text-[10px] text-[#6E7C93]">
          M2 mock auth (localStorage). W3 接入真后端.
        </p>
      </div>

      <Link href="/" className="mt-6 text-[12px] text-[#9FB0C7] hover:text-[#4DA3FF]">
        ← Back to Dashboard
      </Link>
    </main>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-[#6E7C93]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-[#1D2A42] bg-[#0a1422] px-3 py-2 text-[13px] text-[#EAF2FF] placeholder:text-[#6E7C93] focus:border-[#4DA3FF] focus:outline-none"
        required
      />
    </label>
  );
}
