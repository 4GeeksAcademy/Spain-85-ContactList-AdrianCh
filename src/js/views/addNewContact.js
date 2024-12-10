import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import {Context} from "../store/appContext"

import "../../styles/demo.css";

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

				<label>Address</label>
				<input type="text" placeholder="Enter Address" className="my-2 ps-2" name="address" onChange={handleForm}></input>
				
				<div><button type="button" className="btn btn-success mt-2" onClick={logNewContact}>Save</button></div>

			</form>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
