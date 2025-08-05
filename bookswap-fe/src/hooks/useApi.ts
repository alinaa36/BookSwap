import { useState } from "react";

export function useApiRequest<TResponse, TParams = void>(
  apiFn: (params: TParams) => Promise<TResponse>
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = async (params: TParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(params);
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
}
