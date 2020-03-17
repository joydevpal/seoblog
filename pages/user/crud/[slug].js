import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Link from "next/link";

const Blog = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12 py-3">
							<h1>Update blog</h1>
						</div>
						<div className="col-lg-12">
							<BlogUpdate />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default Blog;
