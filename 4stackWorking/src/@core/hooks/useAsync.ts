
// https://usehooks.com/useAsync/
import { useEffect, useState, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios'

type AsyncFunction = () => Promise<any>;

const useAsync = (asyncFunction: AsyncFunction, immediate = true) => {

    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    const [data, setData] = useState<AxiosResponse['data'] | null>(null);
    const [error, setError] = useState<AxiosError | null | string>(null);

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(async () => {
        setStatus("pending");
        setData(null);
        setError(null);
        return asyncFunction()
            .then(({ data }: any) => {
                setData(data);
                setStatus("success");
            })
            .catch((error: AxiosError | null) => {
                setError(error || "Something went wrong!");
                setStatus("error");
            });
    }, [asyncFunction]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, data, error };
};

export default useAsync;
