import React, {useContext, useState, useEffect} from "react";
import {Context} from "../store/appContext"
import { Link , Await} from "react-router-dom";
import "../../styles/home.css";

const Home = () => {
	const [editMode, setEditMode] = useState({arrayIndex: []})
	const {store, actions} = useContext(Context)

	const user = store.user

	function editContact(index) {
		setEditMode({...editMode, arrayIndex: [...editMode.arrayIndex, index]})
	}

	function deleteContact(index) {
		let id = store.contacts[index].id
		actions.deleteContactFromAPI(id, index)
	}

	useEffect (() => {
		if (user !== "" && user !== null){
			window.localStorage.setItem('my-user-name', JSON.stringify(user))
		}
	}, [user])

	useEffect(() => {
		const savedOfflineContacts = window.localStorage.getItem('my-offline-contacts')
		if(!user && savedOfflineContacts.length > 0 && store.contacts.length > 0) {
			window.localStorage.setItem('my-offline-contacts', JSON.stringify(store.contacts));	
			console.log("updating in offline mode");
		}
	}, [store.contacts])


	return (
		<>
		<div className="button-media-adjuster d-flex mx-auto justify-content-end">
			<Link to="/demo" className="d-flex">
					<button className="btn btn-primary p-1">Add to contacts <i className="fa-solid fa-plus my-auto"></i></button>
			</Link>
		</div>
			<ul className="text-center mt-3 p-0">
				{store.contacts.length < 1 ? <p> No Contacts </p> : store.contacts.map((contact, index) =>
					<div key={index} className="current-contacts d-flex flex-row border border-dark mx-auto p-0 mb-4">
						<div className="d-flex justify-content-center image-container">
							<img src="https://i.redd.it/qla3ydt729od1.jpeg" alt="Just a chill guy meme" className="rounded-circle m-auto p-2"/>
						</div>
						<div className="flex-column gap-3 pt-1 info-container">
							{editMode.arrayIndex.includes(index)
							?
								<input type="text" value={contact.name} onChange={(e) => {actions.editOfflineStore(e.target.value, index, "name")}}/>
							:
								<h3 className="d-flex mb-2 ">{contact.name}</h3>
							}
							<div className="d-flex gap-1">
								<i className="fa-solid fa-location-dot my-auto"></i>
								{editMode.arrayIndex.includes(index)
								? 
									<input type="text" value={contact.address} onChange={(e) => {actions.editOfflineStore(e.target.value, index, "address")}}/>
								:
									<p className="my-auto">{contact.address}</p>
								}
							</div>
							<div className="d-flex gap-1 ">
								<i className="fa-solid fa-phone my-auto"></i>
								{editMode.arrayIndex.includes(index)
								?
									<input type="text" value={contact.phone} onChange={(e) => {actions.editOfflineStore(e.target.value, index, "phone")}}/>
								:
									<p className="my-auto">{contact.phone}</p>
								}
							</div>
							<div className="d-flex gap-1 ">
								<i className="fa-solid fa-envelope my-auto"></i>
								{editMode.arrayIndex.includes(index)
								?
									<input type="text" value={contact.email} onChange={(e) => {actions.editOfflineStore(e.target.value, index, "email")}}/>
								:
									<p className="my-auto">{contact.email}</p>
								}
							</div>
						</div>
						<div className="d-flex justify-content-end pe-2 pt-2 position-relative user-settings-container">
							<div>
								<i className="d-flex fa-solid fa-pencil fs-3 me-3" key={index} onClick={() => {editContact(index)}}></i>
							</div>
							<div>
								<a className="d-flex fa-solid fa-trash text-danger fs-3" onClick={() => deleteContact(index)}></a>
							</div>
							<div>
								{editMode.arrayIndex.includes(index) 
								? 
									<button 
										type="button" 
										onClick={() => {
											setEditMode({
												arrayIndex: editMode.arrayIndex.filter((item) => item !== index),
											}), 
											actions.editContactForAPI(index)
										}} 
										className="btn btn-warning position-absolute mb-2 bottom-0 start-50">Save
									</button> 
								: 
									""}
							</div>
						</div>
					</div>
				)}
			</ul>
		</>
	)
};

export default Home