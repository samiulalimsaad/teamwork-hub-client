import { useCallback, useEffect, useRef } from "react";

function useDebounce<T extends (...args: unknown[]) => void>(
    callback: T,
    delay: number,
    dependencies: unknown[] = []
): T {
    const debouncedCallback = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    const memoizedCallback = useCallback(callback, [callback, dependencies]);

    useEffect(() => {
        return () => {
            if (debouncedCallback.current) {
                clearTimeout(debouncedCallback.current);
            }
        };
    }, []);

    const debouncedFunction = useCallback(
        (...args: Parameters<T>) => {
            if (debouncedCallback.current)
                clearTimeout(debouncedCallback.current);

            debouncedCallback.current = setTimeout(() => {
                memoizedCallback(...args);
            }, delay);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [memoizedCallback, delay, dependencies]
    );

    return debouncedFunction as T;
}

export default useDebounce;
