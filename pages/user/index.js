import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";

const UserIndex = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12 py-3">
							<h1>User Dashboard</h1>
						</div>
						<div className="col-lg-4">
							<ul className="list-group">
								<li className="list-group-item">
									<Link href="/user/crud/blog">
										<a>Create Blog</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/user/crud/blogs">
										<a>Update/Delete Blog</a>
									</Link>
								</li>
								<li className="list-group-item">
									<a href="/user/update">Update Profile</a>
								</li>
							</ul>
						</div>
						<div className="col-lg-8">Right Sidebar</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default UserIndex;
