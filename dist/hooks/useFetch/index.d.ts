export declare type FetchStatus = 'uninitialized' | 'fetching' | 'success' | 'error';
/**
 *
 * @param query : any async function
 * @returns
 * status: the status of the query
 * res: the result
 * invalidate: a function to invalidate the current res and refetch
 */
export declare const useFetch: <T>(query: () => Promise<T>) => {
    status: FetchStatus;
    res: T | undefined;
    invalidate: () => void;
};
