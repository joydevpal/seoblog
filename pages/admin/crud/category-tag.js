import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";
import Link from "next/link";

const CategoryTag = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12 py-3">
							<h1>Manage Categories and Tags</h1>
						</div>
						<div className="col-lg-6">
							<p>Categories</p>
							<Category />
						</div>
						<div className="col-lg-6">
							<p>Tags</p>
							<Tag />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default CategoryTag;
