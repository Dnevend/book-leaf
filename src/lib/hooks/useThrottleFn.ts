/* eslint-disable @typescript-eslint/no-explicit-any */
type noop = (...args: any[]) => any;

export const useThrottleFn = (fn: noop, opts: { wait?: number } = {}) => {

    const { wait = 500 } = opts

    let timer: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    const run = (...args: any[]) => {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, lastExecTime + wait - currentTime);

        clearTimeout(timer!); // 清除之前的定时器

        if (remainingTime === 0) {
            fn(...args);
            lastExecTime = currentTime;
        } else {
            timer = setTimeout(() => {
                fn(...args);
                lastExecTime = Date.now();
            }, remainingTime);
        }
    };


    return { run }
}