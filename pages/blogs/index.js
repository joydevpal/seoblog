import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, APP_NAME, DOMAIN, FB_APP_ID } from "../../config";

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
	const head = () => (
		<Head>
			<title>Programming Blogs | {APP_NAME}</title>
			<meta name="description" content="Programming blogs and tutorials react node next JS" />
			<link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
			<meta property="og:title" content={`Latest web development tutorials | ${APP_NAME}`} />
			<meta
				property="og:description"
				content="Programming blogs and tutorials react node next JS"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${DOMAIN}/images/image-1.jpg`} />
			<meta property="og:image:secure_url" content={`${DOMAIN}/images/image-1.jpg`} />
			<meta property="og:image:type" content="image/jpg" />
			<meta property="fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	const [limit, setLimit] = useState(blogsLimit);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(totalBlogs);
	const [loadedBlogs, setLoadedBlogs] = useState([]);

	const loadMore = () => {
		let toSkip = skip + limit;
		listBlogWithCategoriesAndTags(toSkip, limit).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoadedBlogs([...loadedBlogs, ...data.blogs]);
				setSize(data.size);
				setSkip(toSkip);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button onClick={loadMore} className="btn btn-outline-primary btn-lg">
					Load More
				</button>
			)
		);
	};

	const showAllBlogs = () => {
		return blogs.map((blog, i) => {
			return (
				<article key={i}>
					<Card blog={blog} />
					<hr />
				</article>
			);
		});
	};

	const showAllCategories = () => {
		return categories.map((c, i) => (
			<Link key={i} href={`/categories/${c.slug}`}>
				<a className="btn btn-primary mx-1 mt-3">{c.name}</a>
			</Link>
		));
	};

	const showAllTags = () => {
		return tags.map((t, i) => (
			<Link key={i} href={`/tags/${t.slug}`}>
				<a className="btn btn-outline-primary mx-1 mt-3">{t.name}</a>
			</Link>
		));
	};

	const showLoadedBlogs = () => {
		return loadedBlogs.map((blog, i) => (
			<article key={i}>
				<Card blog={blog} />
			</article>
		));
	};

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<main>
					<div className="container-fluid">
						<header>
							<div className="col-md-12 pt-3">
								<h1 className="display-4 font-weight-bold text-center">
									Programming Blogs & tutorials
								</h1>
							</div>
							<section>
								<div className="pb-5 text-center">
									{showAllCategories()}
									<br />
									{showAllTags()}
								</div>
							</section>
						</header>
					</div>
					<div className="container-fluid">{showAllBlogs()}</div>
					<div className="container-fluid">{showLoadedBlogs()}</div>
					<div className="text-center py-5">{loadMoreButton()}</div>
				</main>
			</Layout>
		</React.Fragment>
	);
};

Blogs.getInitialProps = () => {
	const skip = 0;
	const limit = 2;
	return listBlogWithCategoriesAndTags(skip, limit).then(data => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				blogs: data.blogs,
				categories: data.categories,
				tags: data.tags,
				totalBlogs: data.size,
				blogsLimit: limit,
				blogSkip: skip
			};
		}
	});
};

export default withRouter(Blogs);
