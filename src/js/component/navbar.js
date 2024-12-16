import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import {Context} from "../store/appContext"


export const Navbar = () => {
	const {store, actions} = useContext(Context)
	// States for managing inputs
	const [loginUser, setLoginUser] = useState("")
	const [registerUser, setRegisterUser] = useState("")

	return (
		<>
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1 ms-4">React Boilerplate</span>
			</Link>
			{store.user ?
				<div className="d-flex ml-auto gap-2 mx-4 ">
					<p className="my-auto">Welcome <strong>{store.user}</strong>!</p>
					<button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalLogin">
						<i className="fa-solid fa-user"></i>
					</button>
					<button className="btn btn-danger" onClick={() => actions.logOutAccount()}>
						<i className="fa-solid fa-arrow-right-from-bracket"></i>
					</button>
				</div>
				:
				<div className="d-flex ml-auto gap-2 mx-4 ">
					<strong className="my-auto">Offline Mode</strong>
					<button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalLogin">Login</button>
					<button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalRegister">Register</button>
				</div>
			}
		</nav>
		<div className="modal fade" id="modalLogin" tabIndex="-1" aria-labelledby="modalLogin" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="h-auto">
							<label htmlFor="" className="col-6">Username</label>
							<input type="text" className="col-6" placeholder="Add your username" id="user-name-login" onChange={(e) => setLoginUser(e.target.value)}/>
							<p className={`mt-2 mb-0 text-${store.errorMessageLogin === "Logged in!" ? "success" : "danger"}`}>{store.errorMessageLogin}</p>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-success" onClick={loginUser !== "" ? () => actions.loginAccount(loginUser) : () => {}} >Login</button>
					</div>
				</div>
			</div>
		</div>

		<div className="modal fade" id="modalRegister" tabIndex="-1" aria-labelledby="modalRegister" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Register</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="h-auto">
							<label htmlFor="" className="col-6">Username</label>
							<input type="text" className="col-6" placeholder="Add your username" id="user-name-register" onChange={(e) => setRegisterUser(e.target.value)}/>
							<p className={`mt-2 mb-0 text-${store.errorMessageRegister === "Registered!" ? "success" : "danger"}`}>{store.errorMessageRegister}</p>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-success" onClick={registerUser !== "" ? () => actions.registerAccount(registerUser) : () => {}} >Register</button>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};
