import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constant";

function Login() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const [error, setError] = useState("");

    const handleLogin = async function () {
        try {
            const data = {
                emailId: email,
                password: password,
            };
            const result = await axios.post(API_BASE_URL + "/login", data, {
                withCredentials: true,
            });

            dispatch(addUser(result.data.data));

            return navigate("/");
        } catch (e) {
            setError(e.response.data);
        }
    };

    const handleSignup = async () => {
        try {
            const res = await axios.post(
                API_BASE_URL + "/signup",
                { firstName, lastName, emailId: email, password },
                { withCredentials: true },
            );

            dispatch(addUser(res.data.data));

            return navigate("/profile");
        } catch (error) {
            setError(e.response.data);
        }
    };

    return (
        <div className="flex flex-col justify-center min-h-screen items-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <h2 className="text-lg font-semibold text-center mb-2">
                    {isLoginForm ? "Login" : "Sign Up"}
                </h2>
                {!isLoginForm && (
                    <>
                        <label className="label">First Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label className="label">Last Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </>
                )}
                <label className="label">Email</label>
                <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label">Password</label>
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <p className="text-red-500 mt-2">{error}</p>

                <button
                    className="btn btn-neutral mt-4"
                    onClick={isLoginForm ? handleLogin : handleSignup}
                >
                    {isLoginForm ? "Login" : "Sign Up"}
                </button>

                <p
                    className="cursor-pointer text-center mt-3"
                    onClick={() => setIsLoginForm((value) => !value)}
                >
                    {isLoginForm
                        ? "New User? Sigup here"
                        : "Existing User? Login here"}
                </p>
            </fieldset>
        </div>
    );
}

export default Login;
