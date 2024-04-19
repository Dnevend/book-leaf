import { useCallback, useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type noop = (...args: any[]) => any;

export const useDebounceFn = (fn: noop, options?: { delay?: number }) => {
    const { delay = 500 } = options || {};

    const callback = useCallback(fn, [fn]);

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const run = useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return { run };
}