const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			contacts : [], 
			user: null,
			errorMessageLogin : "",
			errorMessageRegister : "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
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
			getInfoAccountContacts: async (user) => {
				try{
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`, {
						method: "GET",
					})
					let data = await response.json()
					return data.contacts
				} catch(error){}
			},
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
			logOutAccount: () =>{
				const store = getStore()
				setStore(store.user = null)
				setStore(store.contacts = [])
				window.localStorage.setItem('my-user-name', JSON.stringify(null))
				getActions().setOfflineStore()
			},
			setOfflineStore: () => {
				const store = getStore()
				const localStoredContactsData = JSON.parse(window.localStorage.getItem('my-offline-contacts'))
				if (localStoredContactsData.length > 0) {
					console.log("setting offline store");
					setStore({...store, contacts: localStoredContactsData})
				}
			},
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
