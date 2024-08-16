import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Welcome to my website!</h1>
			<p>
				<img src="https://picsum.photos/seed/picsum/400/300" />
			</p>
			<div className="">
				<Link to="/login"><button type="button" className="btn btn-success btn-lg">Log In</button></Link>
				<Link to="/signup"><button type="button" className="btn btn-warning btn-lg">Sign Up</button></Link>
			</div>
		</div>
	);
};
