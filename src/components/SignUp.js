import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function SignUp() {
	const { signUp, signInGoogle } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Sign Up | FitIn`;
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		await signUp(email, password, name).catch((err) => console.log(JSON.stringify(err)));
	}

	async function handleGoogle(e) {
		e.preventDefault();
		await signInGoogle().catch((err) => console.log(JSON.stringify(err)));
	}

	return (
		<div className="formCenter">
			<form onSubmit={handleSubmit} className="formFields">
				<div className="formField">
					<label className="formFieldLabel" htmlFor="name">
						Full Name
					</label>
					<input required type="text" id="name" className="formFieldInput" placeholder="Enter your full name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
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
					<button className="formFieldButton">Sign Up</button>
					<div className="googleButton">
						<GoogleButton className="googleBtn" type="light" label="Sign up with Google" onClick={handleGoogle} />
					</div>
					<label className="formFieldCheckboxLabel">
						By signing up, you agree to the
						<Link to="/login" className="formFieldTermsLink">
							Terms of Service
						</Link>
					</label>
				</div>

				<div className="formAuthText">Already have an account?</div>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<button className="formFieldButton2">Sign In</button>
				</Link>
			</form>
		</div>
	);
}

export default SignUp;
