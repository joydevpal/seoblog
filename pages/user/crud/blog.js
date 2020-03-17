import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogCreate from "../../../components/crud/BlogCreate";
import Link from "next/link";

const CreateBlog = () => {
	return (
		<Layout>
			<Private>
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
			</Private>
		</Layout>
	);
};

export default CreateBlog;
