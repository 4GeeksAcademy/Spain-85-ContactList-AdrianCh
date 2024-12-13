import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import {Context} from "../store/appContext"
import {setKey, fromLatLng} from "react-geocode";

import "../../styles/demo.css";

setKey("AIzaSyCiSI_arVYbxCqMrF7xVKx3-XEK6O2i3Qo");

export const Demo = () => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate()

	const [newContact, setNewContact] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	})

	const handleForm = (e) => {
		setNewContact({
			...newContact, 
			[e.target.name]: e.target.value
		})
	}

	async function logNewContact() {
		await actions.saveContactToAPI(newContact)
		navigate("/")
	}

	async function getLocation(e) {
		e.preventDefault()
		navigator.geolocation.getCurrentPosition(function (position) {
			console.log(`Latitude is ${position.coords.latitude}`);
			console.log(`Latitude is ${position.coords.longitude}`);
			fromLatLng(position.coords.latitude, position.coords.longitude)
			.then(({ results }) => {
				console.log(results);
				setNewContact({
					...newContact, 
					address: results[6].formatted_address
				});
				console.log(newContact);
			})
			.catch(console.error);
		})
	}

	useEffect(() => {
        console.log("Updated contact: ", newContact);
    }, [newContact]);
	
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
			
				<div><button className="btn btn-success mt-2" onClick={logNewContact}>Save</button></div>
			</form>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
