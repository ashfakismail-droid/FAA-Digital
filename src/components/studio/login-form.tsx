"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";

export function StudioLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? (response.status === 401 ? "Incorrect username or password." : "Sign-in failed. Try again."));
        setBusy(false);
        return;
      }
      const requested = new URLSearchParams(window.location.search).get("next");
      const target = requested && requested.startsWith("/studio") ? requested : "/studio";
      router.replace(target);
      router.refresh();
    } catch {
      setError("Sign-in failed. Check your connection and try again.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm font-medium">
        Username
        <input
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="studio-input mt-1"
        />
      </label>
      <label className="block text-sm font-medium">
        Password
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="studio-input mt-1"
        />
      </label>

      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-50 dark:bg-white dark:text-slate-950"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        {busy ? "Signing in…" : "Sign in to Studio"}
      </button>
    </form>
  );
}