import { useEffect, useState } from 'react'

/**
 *  This hook returns the json response of a request
 * @param {RequestInfo | URL} url - The url to fetch the json response.
 * @param {RequestInit} options - The options given to the fetch.
 * @returns An array with three elements. First element is the response element
 * it returns null if either loading or error, Second element is the loading element
 * returns true if the fetch promise has not returned anything yet, Third element
 * is the error element it doesn't return null if the request returned an error
 */
export default function useGet(url, options) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setResponse(data)
            })
            .catch(err => setError(err));
    }, [])

    return [response, loading, error];
}
