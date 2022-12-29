import { useEffect, useState } from 'react'

/**
 *  This hook returns the json response of a request
 * @param {RequestInfo | URL} url - The url to fetch the json response.
 * @param {RequestInit} options - The options given to the fetch.
 */
export default function (url, options) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, options)
            .then(res => setResponse(res))
            .catch(err => setError(err))
    }, [])

    return [response, error];
}
