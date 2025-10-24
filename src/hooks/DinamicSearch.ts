import { useState, useEffect } from "react";

export function useDynamicSearch<T>(
  searchFunction: (query: string) => Promise<T>,
  delay: number = 500
) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функція для оновлення query ззовні
  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  useEffect(() => {
    if (!query) {
      setResults(null);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchFunction(query);
        setResults(data);
      } catch (err) {
        setError("Failed to fetch search results");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay, searchFunction]);

  return { query, setQuery, updateQuery, results, loading, error };
}
