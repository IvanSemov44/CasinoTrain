import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerProps {
    initialTime: number;
    onTimeUp?: () => void;
    autoStart?: boolean;
}

interface UseTimerReturn {
    time: number;
    isRunning: boolean;
    start: () => void;
    pause: () => void;
    reset: (newTime?: number) => void;
}

export const useTimer = ({
    initialTime,
    onTimeUp,
    autoStart = true,
}: UseTimerProps): UseTimerReturn => {
    const [time, setTime] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(autoStart);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null
        }
    }, [])

    useEffect(() => {
        if (isRunning && time > 0) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        if (onTimeUp)
                            onTimeUp();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearTimer();
        }

        return () => {
            clearTimer();
        }
    }, [isRunning, time, onTimeUp, clearTimer]);

    const start = useCallback(() => {
        if (time > 0) {
            setIsRunning(true);
        }
    }, [time]);

    const pause = useCallback(() => {
        setIsRunning(false)
    }, []);

    const reset = useCallback((newTime?: number) => {
        setIsRunning(autoStart);
        setTime(newTime !== undefined ? newTime : initialTime)
        clearTimer();
    }, [autoStart, initialTime, clearTimer]);

    return {
        time,
        isRunning,
        start,
        pause,
        reset,
    };
};