const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			contacts : [], 
			user: null,
			errorMessageLogin : "",
			errorMessageRegister : "",
		},
		actions: {
			// Saves to API and sets store State IF theres a user
			saveContactToAPI: async (newContact) => {
				const store = getStore()
				const user = store.user
				if(user) {
					try{
						let response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								"name": newContact.name,
								"email": newContact.email,
								"phone": newContact.phone,
								"address": newContact.address
							})
						})
						let data = await response.json()
						setStore({...store, contacts: [...store.contacts, data]})
						return 
					}catch(error){
						console.log(error);
						return
					}
				}
				setStore({...store, contacts: [...store.contacts, newContact]})
			},
			// Logs into account or shows error, also saves username in local-storage
			loginAccount: async (loginUser) => {
				const store = getStore()
				try{
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/${loginUser}`,{
					method: "GET"
					})
				let data = await response.json()
				if (data.detail === `Agenda \"${loginUser}\" doesn't exist.`){
						setStore({...store, errorMessageLogin: data.detail})
						window.localStorage.setItem('my-user-name', JSON.stringify(""))
				} else {
					setStore({ ...store, user: loginUser })
					setStore({...store, errorMessageLogin: "Logged in!"})

					const userInfo = await getActions().getInfoAccountContacts(loginUser)
					setStore({...store, contacts: userInfo})
				}
				return
				}catch(error){
					console.log(error)
					return
				}
			},
			// Creates new account and saves it in local storage
			registerAccount: async (registerUser) => {
				const store = getStore()
				try{
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/${registerUser}`,{
						method: "POST",
						headers: {
							"accept": "application/json",
						}})
					let data = await response.json()
					console.log(data)
					if (data.detail === `Agenda \"${registerUser}\" already exists.`){
						setStore({...store, errorMessageRegister: data.detail})
					} else {
						setStore({ ...store, user: registerUser })
						setStore({ ...store, contacts: [] })
						setStore({...store, errorMessageRegister: "Registered!"})
					}
					return
				}catch(error){
					console.log(error)
					return
				}
			},
			// Method function for getting info-contacts
			getInfoAccountContacts: async (user) => {
				try{
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`, {
						method: "GET",
					})
					let data = await response.json()
					return data.contacts
				} catch(error){}
			},
			// Delete button for contacts for API and localstorage
			deleteContactFromAPI: async(id, index) => {
				const store = getStore()
				const user = store.user
				if(user){
					try {
						let response = await fetch (`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
							method: "DELETE",
							body: JSON.stringify({
								"id" : id,
							})
						})
					} catch (error) {
						console.log(error)
					}
				}
				setStore ({...store, contacts: store.contacts.filter((_, i) => i !== index)})
			},
			// Logs out and eliminates user from local storage
			logOutAccount: () =>{
				const store = getStore()
				setStore(store.user = null)
				setStore(store.contacts = [])
				window.localStorage.setItem('my-user-name', JSON.stringify(null))
				getActions().setOfflineStore()
			},
			// Gets info from localstorage OR creates a new localstorage
			setOfflineStore: () => {
				const store = getStore()
				const localStoredContactsData = JSON.parse(window.localStorage.getItem('my-offline-contacts'))
				if (localStoredContactsData.length > 0) {
					console.log("setting offline store");
					setStore({...store, contacts: localStoredContactsData})
				} else {
					setStore({...store, contacts: []})
				}
			},
			// Edit contact in front page
			editContactForAPI: async(index) => {
				const store = getStore()
				const contact = store.contacts[index]
				const contactId = contact.id
				
				const user = store.user
				if(user) {
					try{
						await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${contactId}`, {
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								"name": contact.name,
								"email": contact.email,
								"phone": contact.phone,
								"address": contact.address
							})
						})
						return 
					}catch(error){
						console.log(error);
						return
					}
				}
			},
			// Edits the state of the contacts.store."line you are editing"
			editOfflineStore: (value, index, lineName) => {
				const store = getStore()
				setStore({...store, contacts: store.contacts.map((contact, i) => {
					if(index === i) {
						return {
							...contact, [lineName]: value
						}
					}
					return contact
				})})
			}
		}
	};
};

export default getState;
