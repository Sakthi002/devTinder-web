import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoURL, setPhotoURL] = useState(user.photoURL || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const handleUpdate = async () => {
        setError("");
        setShowToast(false);
        try {
            const res = await axios.patch(
                API_BASE_URL + "/profile/edit",
                { firstName, lastName, age, gender, about, photoURL },
                { withCredentials: true },
            );

            dispatch(addUser(res.data.data));

            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (e) {
            console.log(e);

            setError(e.response.data.message);
        }
    };

    return (
        <>
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Updated profile successfully.</span>
                    </div>
                </div>
            )}

            <div className="flex justify-center gap-10 my-10">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
                    <h2 className="text-lg font-semibold text-center mb-2">
                        Edit Profile
                    </h2>

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

                    <label className="label">Photo URL</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Photo URL"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />

                    <label className="label">Age</label>
                    <input
                        type="number"
                        className="input"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <label className="label">Gender</label>
                    <select
                        className="input"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="Others">Others</option>
                    </select>

                    <label className="label">About</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="About"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />

                    <p className="form-control text-red-500 mt-3">{error}</p>

                    <button
                        className="btn btn-neutral mt-4"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                </fieldset>

                <UserCard
                    user={{ firstName, lastName, age, gender, about, photoURL }}
                />
            </div>
        </>
    );
}

export default EditProfile;
