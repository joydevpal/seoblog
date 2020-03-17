import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

// create tag
export const create = (tag, token) => {
	return fetch(`${API}/tag`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(tag)
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// get tags list
export const getTags = () => {
	return fetch(`${API}/tags`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// get a single tag details based on tag slug
export const singleTag = slug => {
	return fetch(`${API}/tag/${slug}`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// delete a tag
export const removeTag = (slug, token) => {
	return fetch(`${API}/tag/${slug}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};
