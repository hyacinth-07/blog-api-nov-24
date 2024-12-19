export const fetchGet = async <T,>(url: string): Promise<T> => {
	const response = await fetch(url, { credentials: 'include' });

	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}

	const data: T = await response.json();
	return data;
};
