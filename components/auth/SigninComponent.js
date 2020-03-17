import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";
import LoginGoogle from "./LoginGoogle";

const SigninComponent = () => {
	const [values, setValues] = useState({
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

	const { email, password, error, loading, message, showForm } = values;

	const handleSubmit = e => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false });
		const user = { email, password };
		signin(user).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push(`/admin`);
					} else {
						Router.push(`/user`);
					}
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

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
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
					<button className="btn btn-primary">Signin</button>
				</div>
			</form>
		);
	};
	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			<LoginGoogle />
			{showForm && signinForm()}
			<br />
			<Link href="/auth/password/forgot">
				<a className="btn btn-outline-danger">Forgot Password</a>
			</Link>
		</React.Fragment>
	);
};

export default SigninComponent;
