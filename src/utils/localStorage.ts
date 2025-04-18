const SEARCH_HISTORY_KEY = 'weatherAppSearchHistory';

export const getSearchHistory = (): string[] => {
  const history = localStorage.getItem(SEARCH_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const addToSearchHistory = (city: string): void => {
  const history = getSearchHistory();
  const updatedHistory = [city, ...history.filter(item => item.toLowerCase() !== city.toLowerCase())].slice(0, 5);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const clearSearchHistory = (): void => {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
};