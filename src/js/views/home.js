import React, {useContext, useState, useEffect} from "react";
import {Context} from "../store/appContext"
import { Link , Await} from "react-router-dom";
import "../../styles/home.css";

const Home = () => {
	const {store, actions} = useContext(Context)

	function deleteContact(index) {
		let id = store.contacts[index].id
		actions.deleteContactFromAPI(id, index)
	}

	return (
		<>
			<Link to="/demo" className="d-flex mb-5">
				<button className="btn btn-primary position-absolute end-0 me-4"><i className="fa-solid fa-plus"></i></button>
			</Link>
			<ul className="text-center mt-3">
				{store.contacts.length < 1 ? <p> No Contacts </p> : store.contacts.map((contact, index) =>
					<div key={index} className="d-flex flex-row border border-dark mx-4 p-0">
						<div className="d-flex flex-grow-1 justify-content-center">
							<img src="https://i.redd.it/qla3ydt729od1.jpeg" alt="Just a chill guy meme" className=" rounded-circle" width="200px"/>
						</div>
						<div className="d-flex flex-column flex-grow-1">
							<span className="d-flex">{contact.name}</span>
							<div className="d-flex">
								<i className="fa-solid fa-location-dot"></i>
								<p>{contact.address}</p>
							</div>
							<div className="d-flex">
								<i className="fa-solid fa-phone"></i>
								<p>{contact.phone}</p>
							</div>
							<div className="d-flex">
								<i className="fa-solid fa-envelope"></i>
								<p>{contact.email}</p>
							</div>
						</div>
						<div className="d-flex flex-grow-1">
							<i className="fa-solid fa-pencil fs-3"></i>
							<a className="fa-solid fa-trash text-danger fs-3" onClick={() => deleteContact(index)}></a>
						</div>
					</div>
				)}
			</ul>
		</>
	)
};

export default Home