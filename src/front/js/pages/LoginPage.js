import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const LoginPage = () => {
	const { store, actions } = useContext(Context);
    const [ state, setState ] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate

	return (
		<div className="text-center mt-5">
			<form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1">
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp">
                    <div id="passwordHelp" className="form-text">We'll never share your password.</div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
		</div>
	);
};