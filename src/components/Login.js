import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	let navigate = useNavigate();
	const { login, signInGoogle } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Sign In | FitIn`;
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		await login(email, password).catch((err) => console.log(JSON.stringify(err)));
		navigate("/");
	}

	async function handleGoogle(e) {
		e.preventDefault();
		await signInGoogle().catch((err) => console.log(JSON.stringify(err)));
		navigate("/");
	}
	return (
		<div className="formCenter">
			<form onSubmit={handleSubmit} className="formFields">
				<div className="formField">
					<label className="formFieldLabel" htmlFor="email">
						E-Mail Address
					</label>
					<input type="email" id="email" className="formFieldInput" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>

				<div className="formField">
					<label className="formFieldLabel" htmlFor="password">
						Password
					</label>
					<input type="password" id="password" className="formFieldInput" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>

				<div className="formField">
					<button className="formFieldButton">Sign In</button>
					<div className="formAuthText">
						Dont have an Account?{" "}
						<Link to="/signup" className="formFieldLink">
							Create an account
						</Link>
					</div>
				</div>

				<div className="socialMediaButtons">
					<div className="googleButton">
						<GoogleButton className="googleBtn" type="light" label="Login with Google" onClick={handleGoogle} />
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
