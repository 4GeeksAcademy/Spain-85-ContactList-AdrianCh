import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import {Context} from "../store/appContext"
import {setKey, fromLatLng} from "react-geocode";

import "../../styles/demo.css";

setKey("AIzaSyCiSI_arVYbxCqMrF7xVKx3-XEK6O2i3Qo");

export const Demo = () => {
	const {store, actions} = useContext(Context)

	// Hooks cant be used in a function
	const navigate = useNavigate()

	// State obj for adding a new Contact
	const [newContact, setNewContact] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	})

	// Handles the inputs of the form to update the state dynamically
	const handleForm = (e) => {
		setNewContact({
			...newContact, 
			[e.target.name]: e.target.value
		})
	}

	// When adding a newContact, saves to API and waits for log before navigating to home
	async function logNewContact(e) {
		e.preventDefault()
		await actions.saveContactToAPI(newContact)
		navigate("/")
	}

	// Gets the location on click and adds it to the adress
	async function getLocation(e) {
		e.preventDefault()
		navigator.geolocation.getCurrentPosition(function (position) {
			fromLatLng(position.coords.latitude, position.coords.longitude)
			.then(({ results }) => {
				setNewContact({
					...newContact, 
					address: results[6].formatted_address
				});
			})
			.catch(console.error);
		})
	}
	
	return (
		<div className="container">	
			<h1>Add a New Contact</h1>
			<form className="d-flex flex-column mt-5">
				<label>Full Name</label>
				<input type="text" placeholder="Full Name" className="my-2 ps-2" name="name" onChange={handleForm}></input>

				<label>Email</label>
				<input type="text" placeholder="Enter Email" className="my-2 ps-2" name="email" onChange={handleForm}></input>

				<label>Phone</label>
				<input type="text" placeholder="Enter Phone" className="my-2 ps-2" name="phone" onChange={handleForm}></input>

				<label className="mb-2">Address</label>
				<div className="d-flex ">
					<input type="text" placeholder="Enter Address" className="ps-2 w-100 m-0" name="address" onChange={handleForm} value={newContact.address}></input>
					<button className="btn btn-dark" onClick={(e) => getLocation(e)}><i className="fa-solid fa-location-dot"></i></button>
				</div>
			
				<div><button className="btn btn-success mt-2" onClick={(e) => logNewContact(e)}>Save</button></div>
			</form>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
