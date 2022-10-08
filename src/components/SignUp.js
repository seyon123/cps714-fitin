import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
	let navigate = useNavigate();
	const { signUp, signInGoogle } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Sign Up | FitIn`;
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		await signUp(email, password, name);
		navigate("/");
	}

	async function handleGoogle(e) {
		e.preventDefault();
		await signInGoogle();
		navigate("/");
	}

	return (
		<div className="formCenter">
			<form onSubmit={handleSubmit} className="formFields">
				<div className="formField">
					<label className="formFieldLabel" htmlFor="name">
						Full Name
					</label>
					<input type="text" id="name" className="formFieldInput" placeholder="Enter your full name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
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
					<button className="formFieldButton">Sign Up</button>
					<br />
					<label className="formFieldCheckboxLabel">
						By signing up, you agree to the
						<a href="null" className="formFieldTermsLink">
							Terms of Service
						</a>
					</label>
					<div className="formAuthText">
						Already have an account?{" "}
						<Link to="/login" className="formFieldLink">
							Sign In
						</Link>
					</div>
				</div>

				<div className="socialMediaButtons">
					<div className="googleButton">
						<GoogleButton className="googleBtn" type="light" label="Sign up with Google" onClick={handleGoogle} />
					</div>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
