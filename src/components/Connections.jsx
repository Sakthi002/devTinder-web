import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = function () {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const result = await axios.get(API_BASE_URL + "/user/connections", {
                withCredentials: true,
            });

            dispatch(addConnections(result.data.data));
        } catch (e) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0)
        return (
            <h1 className="flex justify-center my-10 text-2xl">
                No connections found!
            </h1>
        );

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="font-bold text-2xl mb-4">Connections</h1>

            <ul className="list w-full max-w-4xl">
                {connections.map((connection) => {
                    const {
                        _id,
                        firstName,
                        lastName,
                        age,
                        gender,
                        photoURL,
                        about,
                    } = connection;

                    return (
                        <li
                            className="list-row justfy-between items-center bg-base-200 rounded-box shadow-md mb-4"
                            key={_id}
                        >
                            <div>
                                <img
                                    className="size-10 rounded-box"
                                    alt="User"
                                    src={photoURL}
                                />
                            </div>
                            <div>
                                <div>{firstName + " " + lastName}</div>
                                <div className="text-xs opacity-60">
                                    {about}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Connections;
