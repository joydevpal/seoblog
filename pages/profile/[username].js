import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import moment from "moment";
import { userPublicProfile } from "../../actions/user";
import { API, APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import ContactForm from "../../components/form/ContactForm";

const UserProfile = ({ user, blogs, query }) => {
	const head = () => (
		<Head>
			<title>
				{user.username} | {APP_NAME}
			</title>
			<meta name="description" content={`Blogs by ${user.username}`} />
			<link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
			<meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
			<meta property="og:description" content={`Blogs by ${user.username}`} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${DOMAIN}/images/image-1.jpg`} />
			<meta property="og:image:secure_url" content={`${DOMAIN}/images/image-1.jpg`} />
			<meta property="og:image:type" content="image/jpg" />
			<meta property="fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	const showUserBlogs = () => {
		return blogs.map((blog, i) => {
			return (
				<div className="mx-4" key={i}>
					<Link href={`/blogs/${blog.slug}`}>
						<a className="lead">{blog.title}</a>
					</Link>
				</div>
			);
		});
	};

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-8">
											<h5>{user.name}</h5>
											<p className="text-muted">
												Joined {moment(user.createdAt).fromNow()}
											</p>
										</div>
										<div className="col-md-4">
											<img
												src={`${API}/user/photo/${user.username}`}
												alt="User Profile"
												className="img img-fluid img-thumbnail mb-3"
												style={{ maxHeight: "100px", maxWidth: "100%" }}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container pb-5">
					<div className="row">
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title text-white bg-primary px-4 py-4">{`Recent blogs by ${user.name}`}</h5>
									{showUserBlogs()}
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title text-white bg-primary px-4 py-4">{`Message ${user.name}`}</h5>
									<ContactForm authorEmail={user.email} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
};

UserProfile.getInitialProps = ({ query }) => {
	return userPublicProfile(query.username).then(data => {
		if (data.error) {
			console.log(data.error);
		} else {
			return { user: data.user, blogs: data.blogs, query };
		}
	});
};

export default UserProfile;
