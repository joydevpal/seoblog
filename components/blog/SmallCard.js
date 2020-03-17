import Link from "next/link";
import { API } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

const SmallCard = ({ blog }) => {
	return (
		<div className="card">
			<section>
				<Link href={`/blogs/${blog.slug}`}>
					<a>
						<img
							className="img img-fluid"
							style={{ height: "250px", width: "100%" }}
							src={`${API}/blog/photo/${blog.slug}`}
							alt={blog.title}
						/>
					</a>
				</Link>
			</section>

			<div className="card-body">
				<section>
					<Link href={`/blogs/${blog.slug}`}>
						<a>
							<h5 className="card-title">{blog.title}</h5>
						</a>
					</Link>
					<p className="card-text">{renderHTML(blog.excerpt)}</p>
				</section>
			</div>

			<div className="card-body">
				Posted {moment(blog.updatedAt).fromNow()} by{" "}
				<Link href={`/`}>
					<a className="float-right">{blog.postedBy.username}</a>
				</Link>
			</div>
		</div>

		// 	<div className="lead pb-4">
		// 		<header>
		// 			<Link href={`/blogs/${blog.slug}`}>
		// 				<a>
		// 					<h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
		// 				</a>
		// 			</Link>
		// 		</header>
		// 		<section>
		// 			<p className="mark ml-1 pt-2 pb-2">
		// 				Written by {blog.postedBy.name} | Published on{" "}
		// 				{moment(blog.updatedAt).fromNow()}
		// 			</p>
		// 		</section>
		// 		<section>
		// 			{showBlogCategories()}
		// 			{showBlogTags()}
		// 		</section>
		// 		<div className="row">
		// 			<div className="col-md-4">
		// 				<section>
		// 					<img
		// 						className="img img-fluid"
		// 						style={{ maxHeight: "150px", width: "auto" }}
		// 						src={`${API}/blog/photo/${blog.slug}`}
		// 						alt={blog.title}
		// 					/>
		// 				</section>
		// 			</div>
		// 			<div className="col-md-8">
		// 				<section>
		// 					<div className="pb-3">{renderHTML(blog.excerpt)}</div>
		// 					<Link href={`/blog/${blog.slug}`}>
		// 						<a className="btn btn-primary mt-2 pt-2">Read More</a>
		// 					</Link>
		// 				</section>
		// 			</div>
		// 		</div>
		// 	</div>
	);
};

export default SmallCard;
