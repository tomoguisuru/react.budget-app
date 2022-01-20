import { useEffect, useState, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: any): [Array<T>, Dispatch<SetStateAction<Array<T>>>] {
    const [value, setValue] = useState<Array<T>>(() => {
        const jsonValue = localStorage.getItem(key);

        if (!!jsonValue) {
            return JSON.parse(jsonValue);
        }

        if (typeof defaultValue === 'function') {
            return defaultValue();
        }

        return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}