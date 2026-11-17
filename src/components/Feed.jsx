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

    if (!feed) return;

    if (feed.length === 0)
        return (
            <h1 className="flex justify-center my-10 text-2xl">
                No users found!
            </h1>
        );

    return (
        <div className="flex justify-center my-10">
            <UserCard user={feed[0]}></UserCard>
        </div>
    );
}

export default Feed;
