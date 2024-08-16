import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SignupPage = () => {
    const { actions } = useContext(Context);
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state;

        try {
            const success = await actions.createUser(email, password);
            if (success) {
                navigate("/login"); // Redirect to login page after successful signup
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            setError("Error signing up. Please try again.");
            console.error("Error signing up", error);
        }
    };

    return (
        <div className="text-center mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={state.password}
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                        required
                    />
                    <div id="passwordHelp" className="form-text">We'll never share your password.</div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        </div>
    );
};