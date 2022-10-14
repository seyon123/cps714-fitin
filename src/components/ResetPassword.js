import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
	const { resetPassword } = useAuth();
	let navigate = useNavigate();
	const [email, setEmail] = useState("");

	useEffect(() => {
		document.title = `Reset Password | FitIn`;
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		await resetPassword(email)
			.then(() => navigate("/login"))
			.catch((err) => alert(JSON.stringify(err)));
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
					<button className="formFieldButton">Reset Password</button>
				</div>
			</form>
		</div>
	);
}

export default ResetPassword;
