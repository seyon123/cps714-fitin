import React, { useState, useEffect } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Sign In | FitIn`;
	}, []);
	return (
		<div className="formCenter">
			<form className="formFields">
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
						<GoogleLoginButton onClick={() => alert("Hello")} />
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
