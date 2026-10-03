"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCount = async () => {
    const { data, error } = await supabase.rpc("get_waitlist_count");

    if (!error && data !== null) {
      setCount(Number(data));
    }
  };

  useEffect(() => {
    loadCount();
  }, []);

  const joinWaitlist = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("waitlist").insert({
      email: email.trim().toLowerCase(),
      source: "website",
    });

    if (error) {
      if (error.code === "23505") {
        setMessage("You're already on the waitlist.");
      } else {
        setMessage(error.message);
      }

      setLoading(false);
      return;
    }

    setEmail("");
    setMessage("You're on the waitlist!");
    await loadCount();
    setLoading(false);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Food O Friend</h1>

      <p>{count} people have joined the waitlist.</p>

      <form onSubmit={joinWaitlist}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}