import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const UserInfoContext = React.createContext();

const UserInfoProvider = props => {
	const [state, setState] = useState({ favoriteSpots: [] });

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<UserInfoContext.Provider value={[state, setState]}>
			{props.children}
		</UserInfoContext.Provider>
	);
};

export { UserInfoContext, UserInfoProvider };
