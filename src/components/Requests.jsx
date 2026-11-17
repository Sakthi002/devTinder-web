import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

function Requests() {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

    async function fetchRequests() {
        try {
            const result = await axios.get(
                API_BASE_URL + "/user/requests/received",
                { withCredentials: true },
            );

            dispatch(addRequests(result.data.data));
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleRequest(id, status) {
        setShowAlert(false);
        try {
            const res = await axios.post(
                API_BASE_URL + "/request/review/" + status + "/" + id,
                {},
                { withCredentials: true },
            );
            setSelectedStatus(status);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            dispatch(removeRequest(id));
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (!requests.length)
        return (
            <h1 className="flex justify-center my-10 text-2xl">
                {" "}
                No requests found{" "}
            </h1>
        );

    return (
        <>
            {showAlert && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Request {selectedStatus} successfully.</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center my-10">
                <h1 className="font-bold text-2xl mb-4">Requests</h1>

                <ul className="list w-full max-w-4xl">
                    {requests.map((request) => {
                        const { firstName, lastName, photoURL, about } =
                            request.fromUserId;

                        const reqId = request._id;

                        return (
                            <li
                                className="list-row justfy-between items-center bg-base-200 rounded-box shadow-md mb-4"
                                key={reqId}
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
                                    <div className="text-xs font-semibold opacity-60">
                                        {about}
                                    </div>
                                </div>
                                {/* Reject: times (X) icon */}
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        handleRequest(reqId, "rejected")
                                    }
                                >
                                    <svg
                                        aria-label="Reject"
                                        className="size-[1.2em]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path d="M18 6 6 18M6 6l12 12"></path>
                                        </g>
                                    </svg>{" "}
                                    Reject
                                </button>
                                {/* Accept: check icon */}
                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        handleRequest(reqId, "accepted")
                                    }
                                >
                                    <svg
                                        aria-label="Accept"
                                        className="size-[1.2em]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path d="M20 6 9 17l-5-5"></path>
                                        </g>
                                    </svg>{" "}
                                    Accept
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default Requests;
