import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth, handleResponse } from "./auth";

// create blog
export const createBlog = (blog, token) => {
	let createBlogEndpoint;
	if (isAuth() && isAuth().role === 1) {
		createBlogEndpoint = `${API}/blog`;
	} else if (isAuth() && isAuth().role === 0) {
		createBlogEndpoint = `${API}/user/blog`;
	}
	return fetch(`${createBlogEndpoint}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: blog
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// list blogs with categories and tags
export const listBlogWithCategoriesAndTags = (skip, limit) => {
	const data = {
		limit,
		skip
	};
	return fetch(`${API}/blogs-categories-tags`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// get a single blog
export const singleBlog = slug => {
	return fetch(`${API}/blog/${slug}`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// list related blogs
export const listRelated = blog => {
	return fetch(`${API}/blogs/related`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(blog)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// get a list of blogs
export const list = username => {
	let listBlogsEndpoint;
	if (username) {
		listBlogsEndpoint = `${API}/${username}/blogs`;
	} else {
		listBlogsEndpoint = `${API}/blogs`;
	}

	return fetch(`${listBlogsEndpoint}`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// remove a blog
export const removeBlog = (slug, token) => {
	let deleteBlogEndpoint;
	if (isAuth() && isAuth().role === 1) {
		deleteBlogEndpoint = `${API}/blog/${slug}`;
	} else if (isAuth() && isAuth().role === 0) {
		deleteBlogEndpoint = `${API}/user/blog/${slug}`;
	}

	return fetch(`${deleteBlogEndpoint}`, {
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

// update a blog
export const updateBlog = (blog, token, slug) => {
	let updateBlogEndpoint;
	if (isAuth() && isAuth().role === 1) {
		updateBlogEndpoint = `${API}/blog/${slug}`;
	} else if (isAuth() && isAuth().role === 0) {
		updateBlogEndpoint = `${API}/user/blog/${slug}`;
	}

	return fetch(`${updateBlogEndpoint}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: blog
	})
		.then(response => {
			handleResponse(response);
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// get a serach list of blogs
export const listSearch = params => {
	let query = queryString.stringify(params);
	return fetch(`${API}/blogs/search?${query}`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
