"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface WaitlistCountContextValue {
  count: number | null;
  setCount: (count: number) => void;
}

const WaitlistCountContext = createContext<WaitlistCountContextValue>({
  count: null,
  setCount: () => {},
});

interface WaitlistCountProviderProps {
  initialCount: number | null;
  children: ReactNode;
}

/** Shares the live waitlist count so any form can update every social-proof display. */
export default function WaitlistCountProvider({ initialCount, children }: WaitlistCountProviderProps) {
  const [count, setCount] = useState(initialCount);
  const value = useMemo(() => ({ count, setCount }), [count]);
  return <WaitlistCountContext.Provider value={value}>{children}</WaitlistCountContext.Provider>;
}

export const useWaitlistCount = (): WaitlistCountContextValue => useContext(WaitlistCountContext);
