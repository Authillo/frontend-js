export const parseResultsFromQueryString = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const code = queryParams.get("code");
	const state = queryParams.get("state");
	return { code, state };
};
