import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>,
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const storedTheme = Cookies.get('theme');
    setState(JSON.parse(storedTheme) || initialState);
  }, []);

  useEffect(() => {
    Cookies.set(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;