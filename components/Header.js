import React, { useState } from "react";
import { APP_NAME } from "../config";
import Router from "next/router";
import NProgress from "nprogress";
import { isAuth, signout } from "../actions/auth";
import Link from "next/link";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from "reactstrap";
import Search from "./blog/Search";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<React.Fragment>
			<Navbar color="light" light expand="md">
				<Link href="/">
					<NavLink className="font-weight-bold">{APP_NAME}</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link href="/blogs">
								<NavLink>Blogs</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Link href="/contact">
								<NavLink>Contact</NavLink>
							</Link>
						</NavItem>
						{isAuth() && isAuth().role === 1 && (
							<NavItem>
								<Link href="/admin">
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}
						{isAuth() && isAuth().role === 0 && (
							<NavItem>
								<Link href="/user">
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{!isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href="/signin">
										<NavLink>Signin</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href="/signup">
										<NavLink>Signup</NavLink>
									</Link>
								</NavItem>
							</React.Fragment>
						)}

						{isAuth() && (
							<NavItem>
								<NavLink
									style={{ cursor: "pointer" }}
									onClick={() => signout(() => Router.replace("/signin"))}
								>
									Signout
								</NavLink>
							</NavItem>
						)}
						<NavItem>
							<Link href="/user/crud/blog">
								<NavLink className="btn btn-primary text-light">
									Write a Blog
								</NavLink>
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
			<Search />
		</React.Fragment>
	);
};

export default Header;
