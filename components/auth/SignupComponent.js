import { useState, useEffect } from "react";
import { signup, isAuth, preSignup } from "../../actions/auth";
import { Router } from "next/router";
import Link from "next/link";

const SignupComponent = () => {
	const [values, setValues] = useState({
		name: "Joydev Pal",
		email: "joydev.pal01@gmail.com",
		password: "123456",
		error: "",
		loading: false,
		message: "",
		showForm: true
	});

	useEffect(() => {
		isAuth() && Router.push("/");
	}, []);

	const { name, email, password, error, loading, message, showForm } = values;

	const handleSubmit = e => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false });
		const user = { name, email, password };

		preSignup(user).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					error: "",
					loading: false,
					message: data.message,
					showForm: false
				});
			}
		});
	};
	const handleChange = e => {
		//console.log(e.target.value);
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : "");
	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : "");
	const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : "");

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						name="name"
						value={name}
						type="text"
						className="form-control"
						onChange={handleChange}
						placeholder="Enter your name"
					/>
				</div>
				<div className="form-group">
					<input
						name="email"
						value={email}
						type="email"
						className="form-control"
						onChange={handleChange}
						placeholder="Enter your email"
					/>
				</div>
				<div className="form-group">
					<input
						name="password"
						value={password}
						type="password"
						className="form-control"
						onChange={handleChange}
						placeholder="Enter your password"
					/>
				</div>
				<div>
					<button className="btn btn-primary">Signup</button>
				</div>
			</form>
		);
	};
	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signupForm()}
			<br />
			<Link href="/auth/password/forgot">
				<a className="btn btn-outline-danger">Forgot Password</a>
			</Link>
		</React.Fragment>
	);
};

export default SignupComponent;
