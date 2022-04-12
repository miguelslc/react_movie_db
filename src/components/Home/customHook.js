import { useEffect, useState } from 'react';
import {
    API_URL,
    API_KEY,
} from '../../config';

export const useFetchMovies = () => {
    const [state, setState] = useState({ movies: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const popularEP = "movie/popular";

    const fetchMovies = async endpoint => {
        setIsError(false);
        setIsLoading(true);

        const params = new URLSearchParams(endpoint);
        if (!params.get('page')) {
            setState(prev => ({
                ...prev,
                movies: [],
                searchTerm: params.get('query'),
            }))
        }
        try {
            const result = await (await fetch(endpoint)).json();
            setState(prev => ({
                ...prev,
                movies: [...prev.movies, ...result.results],
                heroImage: prev.heroImage || result.results[0],
                currentPage: result.page,
                totalPages: result.total_pages
            }))
        } catch (error) {
            setIsError(true)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (sessionStorage.getItem('HomeState')) {
            const persistedState = JSON.parse(sessionStorage.getItem('HomeState'));
            setState({ ...persistedState })
        } else {
            fetchMovies(`${API_URL}${popularEP}?api_key=${API_KEY}`)
        }
    }, [])

    useEffect(() => {
        if (!state.searchTerm) sessionStorage.setItem('HomeState', JSON.stringify(state))
    }, [state]);

    return [{ state, isLoading, isError }, fetchMovies]
}