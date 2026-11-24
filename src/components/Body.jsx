import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const result = await axios.get(API_BASE_URL + "/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(result.data));
        } catch (e) {
            if (e.status === 401) {
                return navigate("/login");
            }
            console.error(e.message);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Body;
