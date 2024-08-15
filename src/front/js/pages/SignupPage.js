import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SignupPage = () => {
    const { actions } = useContext(Context);
    const [state, setState] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = state;
        
        // Call createUser action from context
        try {
            const success = await actions.createUser(username, password);
            if (success) {
                navigate("/login"); // Redirect to login page after successful signup
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Error signing up", error);
        }
    };

    return (
        <div className="text-center mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={state.username}
                        onChange={(e) => setState({ ...state, username: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                        required
                    />
                    <div id="passwordHelp" className="form-text">We'll never share your password.</div>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        </div>
    );
};