const UserCard = (feed) => {
    const { firstName, lastName, about, age, gender, photoURL } = feed.user;

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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
