import React, { useState, useEffect } from 'react'

export default function UseLocalStorage(key, initialValue) {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const user = window.localStorage.getItem(key);
            return user ? JSON.parse(user) : initialValue;
        } catch(error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore =
            value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch(error) {
            console.log(error);
        }
    }

    return [storedValue, setValue];
}
