import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const SecretPage = () => {
	const navigate = useNavigate();

    const logout = () => {
        // Remove token from local storage
        localStorage.removeItem('authToken');
        // Redirect to home or login page
        navigate('/'); // Use navigate to redirect
    };

	return (
		<div className="text-center mt-5">
			<h1>Welcome to the secret page!</h1>
			<p>
				<img src="https://picsum.photos/seed/picsum/400/300" />
			</p>
			<div className="">
				<Link to="/"><button type="button" className="btn btn-success btn-lg" onClick={logout}>Log Out</button></Link>
			</div>
		</div>
	);
};