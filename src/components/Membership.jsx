import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useState } from "react";

const plans = [
    {
        id: "basic",
        name: "Basic",
        price: "Free",
        features: [
            { text: "Create your developer profile", included: true },
            { text: "10 connection requests per day", included: true },
            { text: "Chat with your connections", included: false },
            { text: "Verified blue tick", included: false },
            { text: "See who viewed your profile", included: false },
            { text: "Priority in feed", included: false },
        ],
        buttonText: "Current plan",
        buttonClass: "btn-outline",
        disabled: true,
    },
    {
        id: "silver",
        name: "Silver",
        price: "₹299/mo",
        features: [
            { text: "Create your developer profile", included: true },
            { text: "100 connection requests per day", included: true },
            { text: "Chat with your connections", included: true },
            { text: "Verified blue tick", included: true },
            { text: "See who viewed your profile", included: false },
            { text: "Priority in feed", included: false },
        ],
        buttonText: "Get Silver",
        buttonClass: "btn-neutral",
    },
    {
        id: "gold",
        name: "Gold",
        price: "₹699/mo",
        badge: "Most popular",
        highlight: true,
        features: [
            { text: "Create your developer profile", included: true },
            { text: "Unlimited connection requests", included: true },
            { text: "Chat with your connections", included: true },
            { text: "Verified blue tick", included: true },
            { text: "See who viewed your profile", included: true },
            { text: "Priority in feed", included: true },
        ],
        buttonText: "Get Gold",
        buttonClass: "btn-warning",
    },
];

function CheckIcon({ included }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-4 me-2 inline-block ${
                included ? "text-success" : "text-base-content/50"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
}

function PlanCard({ plan, onSubscribe }) {
    return (
        <div
            className={`card w-full max-w-sm bg-base-100 shadow-sm ${
                plan.highlight ? "border-2 border-warning md:scale-105" : ""
            }`}
        >
            <div className="card-body">
                <div className="h-5">
                    {plan.badge && (
                        <span className="badge badge-xs badge-warning">
                            {plan.badge}
                        </span>
                    )}
                </div>

                <div className="flex justify-between items-baseline">
                    <h2 className="text-3xl font-bold">{plan.name}</h2>
                    <span className="text-xl">{plan.price}</span>
                </div>

                <ul className="mt-6 flex flex-col gap-2 text-xs">
                    {plan.features.map((f) => (
                        <li
                            key={f.text}
                            className={f.included ? "" : "opacity-50"}
                        >
                            <CheckIcon included={f.included} />
                            <span className={f.included ? "" : "line-through"}>
                                {f.text}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-6">
                    <button
                        className={`btn btn-block ${plan.buttonClass}`}
                        disabled={plan.disabled}
                        onClick={() => onSubscribe(plan.id)}
                    >
                        {plan.buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Membership() {
    const [isPremium, setIspremium] = useState(false);
    useEffect(() => {
        verifyPremium();
    }, []);

    const verifyPremium = async () => {
        try {
            const res = await axios.get(API_BASE_URL + "/premium/verify", {
                withCredentials: true,
            });
            setIspremium(res.data.isPremium);
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleSubscribe = async (planId) => {
        try {
            const order = await axios.post(
                API_BASE_URL + "/payment/create",
                {
                    membershipType: planId,
                },
                { withCredentials: true },
            );

            const { amount, currency, notes, orderId } = order.data.data;
            console.log(order.data.data, "orderrr");

            const options = {
                key: order.data.keyId,
                amount,
                currency,
                name: "Dev Tinder",
                description: "Connecting developers....",
                order_id: order.data.data.orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.emailId,
                },
                theme: {
                    color: "#F37254",
                },
                handler: verifyPremium,
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error.message);
        }
    };

    return isPremium ? (
        <div className="min-h-full flex items-center justify-center px-4 py-10">
            <div className="card w-full max-w-md bg-base-100 shadow-md border-2 border-warning">
                <div className="card-body items-center text-center">
                    <div className="flex items-center justify-center size-16 rounded-full bg-warning/20 text-warning text-3xl">
                        ⭐
                    </div>

                    <span className="badge badge-warning mt-3">
                        Active membership
                    </span>

                    <h1 className="text-2xl font-bold mt-2">
                        You're a Premium member 🎉
                    </h1>
                    <p className="text-sm opacity-70">
                        Thanks for supporting DevTinder. Enjoy all your premium
                        features.
                    </p>

                    <div className="card-actions w-full mt-6">
                        <a href="/" className="btn btn-neutral btn-block">
                            Start connecting
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-full px-4 py-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold">Choose your plan</h1>
                <p className="mt-2 text-sm opacity-70">
                    Connect with more developers and stand out in the feed.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        onSubscribe={handleSubscribe}
                    />
                ))}
            </div>
        </div>
    );
}

export default Membership;
