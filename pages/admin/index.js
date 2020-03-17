import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

const AdminIndex = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12 py-3">
							<h1>Admin Dashboard</h1>
						</div>
						<div className="col-lg-4">
							<ul className="list-group">
								<li className="list-group-item">
									<Link href="/admin/crud/category-tag">
										<a>Create Category</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/admin/crud/category-tag">
										<a>Create Tag</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/admin/crud/blog">
										<a>Create Blog</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/admin/crud/blogs">
										<a>Update/Delete Blog</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/user/update">
										<a>Update Profile</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-lg-8">Right Sidebar</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default AdminIndex;
