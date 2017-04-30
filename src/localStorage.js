export const loadState = () => {
	try {
		const serializableState = localStorage.getItem('state');
		if(serializableState === null) {
			return undefined;
		}
		return JSON.parse(serializableState);
	} catch(err) {
		return undefined;
	}
}

export const saveState = (state) => {
	try {
		const serializableState = JSON.stringify(state);
		localStorage.setItem('state', serializableState);
	} catch(err) {
		// Ignore write errors
	}
}