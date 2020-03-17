import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogRead from "../../../components/crud/BlogRead";
import Link from "next/link";
import { isAuth } from "../../../actions/auth";

const Blog = () => {
	const username = isAuth() && isAuth().username;
	return (
		<Layout>
			<Private>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 py-3">
							<h1>Manage blogs</h1>
						</div>
						<div className="col-lg-12">
							<BlogRead username={username} />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default Blog;
