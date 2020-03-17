import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogRead from "../../../components/crud/BlogRead";
import Link from "next/link";

const Blog = () => {
	return (
		<Layout>
			<Admin>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 py-3">
							<h1>Manage blogs</h1>
						</div>
						<div className="col-lg-12">
							<BlogRead />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default Blog;
