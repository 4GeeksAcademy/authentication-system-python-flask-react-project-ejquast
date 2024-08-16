import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const LoginPage = () => {
    const { actions } = useContext(Context);
    const [state, setState] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state;

        try {
            const success = await actions.loginUser(email, password);
            if (success) {
                navigate("/very-important-private-data");
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error logging in", error);
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};