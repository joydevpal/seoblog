import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";
import { API } from "../../config";

const ProfileUpdate = () => {
	const [values, setValues] = useState({
		username: "",
		username_for_photo: "",
		name: "",
		email: "",
		password: "",
		photo: "",
		about: "",
		error: false,
		success: false,
		loading: false,
		userData: process.browser && new FormData()
	});

	const token = getCookie("token");
	const {
		username,
		username_for_photo,
		name,
		email,
		password,
		photo,
		about,
		userData,
		error,
		success,
		loading
	} = values;

	const init = () => {
		getProfile(token).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					username: data.username,
					username_for_photo: data.username,
					name: data.name,
					email: data.email,
					about: data.about
				});
			}
		});
	};

	useEffect(() => {
		init();
		setValues({ ...values, userData: new FormData() });
	}, []);

	const handleChange = name => e => {
		const value = name === "photo" ? e.target.files[0] : e.target.value;
		userData.append(name, value);
		setValues({
			...values,
			[name]: value,
			userData,
			error: false,
			success: false
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		update(token, userData).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false, loading: false });
			} else {
				updateUser(data, () => {
					setValues({
						...values,
						username: data.username,
						name: data.name,
						email: data.email,
						about: data.about,
						success: true,
						loading: false
					});
				});
			}
		});
	};

	const profileUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="btn btn-outline-info">
					Upload Profile Photo
					<input onChange={handleChange("photo")} type="file" accept="image/*" hidden />
				</label>
			</div>
			<div className="form-group">
				<label className="text-muted">Username</label>
				<input
					onChange={handleChange("username")}
					type="text"
					value={username}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					onChange={handleChange("name")}
					type="text"
					value={name}
					className="form-control"
				/>
			</div>
			{/* <div className="form-group">
				<label className="text-muted">Email</label>
				<input
					onChange={handleChange("email")}
					type="text"
					value={email}
					className="form-control"
				/>
			</div> */}
			<div className="form-group">
				<label className="text-muted">About</label>
				<textarea
					onChange={handleChange("about")}
					value={about}
					className="form-control"
				></textarea>
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					onChange={handleChange("password")}
					type="password"
					value={password}
					className="form-control"
				/>
			</div>
			<div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</div>
		</form>
	);

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-success" style={{ display: success ? "" : "none" }}>
			Profile updated
		</div>
	);

	const showLoading = () => (
		<div className="alert alert-info" style={{ display: loading ? "" : "none" }}>
			Loading...
		</div>
	);

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<img
							src={`${API}/user/photo/${username}`}
							alt="User Profile"
							className="img img-fluid img-thumbnail mb-3"
							style={{ maxHeight: "auto", maxWidth: "100%" }}
						/>
					</div>
					<div className="col-md-8 mb-5">
						{showError()}
						{showSuccess()}
						{showLoading()}
						{profileUpdateForm()}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProfileUpdate;
