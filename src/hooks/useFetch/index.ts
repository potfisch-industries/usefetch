import { useCallback, useEffect, useState } from 'react';

export type FetchStatus = 'uninitialized' | 'fetching' | 'success' | 'error';

/**
 * 
 * @param query : any async function
 * @returns 
 * status: the status of the query
 * res: the result
 * invalidate: a function to invalidate the current res and refetch
 */
export const useFetch = <T>(
	query: () => Promise<T>
): { status: FetchStatus; res: T | undefined; invalidate: () => void } => {
	const [status, setStatus] = useState<FetchStatus>('uninitialized');
	const [res, setRes] = useState<T | undefined>();

	const invalidate = () => {
		setStatus('uninitialized');
		setRes(undefined);
	};
	const executeQuery = useCallback(async () => {
		if (res || status === 'error' || status === 'fetching') {
			return;
		}
		if (status === 'uninitialized') {
			setStatus('fetching');
		}
		await query()
			.then((queryResult) => {
				setRes(queryResult);
				setStatus('success');
			})
			.catch(() => setStatus('error'));
	}, [query, res, status]);

	useEffect(() => {
		executeQuery();
	}, [executeQuery]);

	return { status, res, invalidate };
};