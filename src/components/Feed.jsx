import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
    const feed = useSelector((store) => store.feed);

    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;

        try {
            const result = await axios.get(API_BASE_URL + "/feed", {
                withCredentials: true,
            });

            dispatch(addFeed(result.data.data));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]}></UserCard>
            </div>
        )
    );
}

export default Feed;
