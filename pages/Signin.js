import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { withRouter } from "next/router";

const Signin = ({ router }) => {
	const showRedirectMessage = () => {
		if (router.query.message) {
			return <div className="alert alert-danger">{router.query.message}</div>;
		} else {
			return;
		}
	};
	return (
		<Layout>
			<div className="container">
				<div className="row">
					<div className="col-6 offset-3">{showRedirectMessage()}</div>
				</div>
				<div className="row">
					<div className="col-6 offset-3">
						<h1 className="text-center pt-4 pb-4">Signin</h1>
						<SigninComponent />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(Signin);
