import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";
import Link from "next/link";

const Signup = () => {
	return (
		<Layout>
			<div className="container">
				<div className="row">
					<div className="col-6 offset-3">
						<h1 className="text-center pt-4 pb-4">Signup</h1>
						<SignupComponent />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
