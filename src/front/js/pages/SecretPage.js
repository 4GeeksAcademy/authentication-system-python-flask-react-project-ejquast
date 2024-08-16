import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const SecretPage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Welcome to the secret page!</h1>
			<p>
				<img src="https://picsum.photos/seed/picsum/400/300" />
			</p>
			<div className="">
				<Link to="/"><button type="button" className="btn btn-success btn-lg">Log Out</button></Link>
			</div>
		</div>
	);
};