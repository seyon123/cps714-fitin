import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Login() {
	const { login, signInGoogle } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Sign In | FitIn`;
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		await login(email, password).catch((err) => alert(JSON.stringify(err)));
	}

	async function handleGoogle(e) {
		e.preventDefault();
		await signInGoogle().catch((err) => alert(JSON.stringify(err)));
	}
	return (
		<div className="formCenter">
			<form onSubmit={handleSubmit} className="formFields">
				<div className="formField">
					<label className="formFieldLabel" htmlFor="email">
						E-Mail Address
					</label>
					<input required type="email" id="email" className="formFieldInput" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>

				<div className="formField">
					<label className="formFieldLabel" htmlFor="password">
						Password
					</label>
					<input
						required
						type="password"
						id="password"
						className="formFieldInput"
						placeholder="Enter your password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="formField">
					<button className="formFieldButton">Sign In</button>
					<div className="googleButton">
						<GoogleButton className="googleBtn" type="light" label="Login with Google" onClick={handleGoogle} />
					</div>
					<label className="formFieldCheckboxLabel">
						<Link to="/signup" className="formFieldLink">
							Forgot password?
						</Link>
					</label>
				</div>
				<div className="formAuthText">Don't have an account?</div>
				<Link to="/signup" style={{ textDecoration: "none" }}>
					<button className="formFieldButton2">Join Now</button>
				</Link>
			</form>
		</div>
	);
}

export default Login;
