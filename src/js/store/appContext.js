import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		// On.load logic to get: Username OR Offline Contacts OR Creating a local.storage (for first time users)
		useEffect(() => {
			const userData = window.localStorage.getItem('my-user-name');
			const offlineContactsData = window.localStorage.getItem('my-offline-contacts');
			const parsedUser = JSON.parse(userData); // Parse user data
			const parsedOfflineContacts = offlineContactsData ? JSON.parse(offlineContactsData) : [];
			if (parsedUser) {
			  state.actions.loginAccount(parsedUser);
			} else if (parsedOfflineContacts.length > 0) {
			  state.actions.setOfflineStore(parsedOfflineContacts);
			} else {
			  window.localStorage.setItem('my-user-name', JSON.stringify(null));
			  window.localStorage.setItem('my-offline-contacts', JSON.stringify([]));
			  state.actions.setOfflineStore([]);
			}
		  }, []);

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
