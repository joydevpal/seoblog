import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";
import Link from "next/link";

const Blog = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12 py-3">
							<h1>Create a new blog</h1>
						</div>
						<div className="col-lg-12">
							<BlogCreate />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default Blog;
