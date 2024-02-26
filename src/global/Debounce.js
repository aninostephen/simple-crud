import React, { useEffect, useState } from 'react';

const useDebounceValue = (value, delay = 500) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {

        const timeout = setTimeout(function() {
            setDebouncedValue(value)
        }, delay);

        return () => clearTimeout(timeout);

    }, [value, delay]);

    return debouncedValue;
}

export default useDebounceValue;