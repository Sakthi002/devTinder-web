import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = (feed) => {
    const { _id, firstName, lastName, about, age, gender, photoURL } =
        feed.user;

    const dispatch = useDispatch();

    const reviewRequest = async (status) => {
        try {
            const res = await axios.post(
                API_BASE_URL + "/request/send/" + status + "/" + _id,
                {},
                { withCredentials: true },
            );
            dispatch(removeFeed(_id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure className="h-72">
                <img
                    src={photoURL}
                    alt="User"
                    className="w-full h-full object-cover object-top"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center">
                    <button
                        className="btn btn-primary"
                        onClick={() => reviewRequest("ignored")}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => reviewRequest("interested")}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
