import { useEffect, useState } from "react";

// Simulates an async fetch so pages can show skeleton loaders briefly.
export default function useLoading(delay = 600) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return loading;
}
