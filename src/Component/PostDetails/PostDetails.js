import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./../GetDetails/GetDetails.module.css";
import PaymentPostDetails from "./PaymentPostDetails";
import PrizePostDetails from "./PrizePostDetails";
import TokenPostDetails from "./TokenPostDetails";
import Loader from "../HomePage/Loader";

function PostDetails() {

    const [isVisible, setIsVisible] = useState(false);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [tab, setTab] = useState();


    const tabChange = function (tabString = "default") {
        if (tabString === tab) {
            setIsVisible(!isVisible);
        } else {
            setIsVisible(true);
            setTab(tabString);
        }
        console.log(tab);
    }

    const togglePreLoader = (bool) => {
        setIsLoaderVisible(bool);
    }

    const setDisplayMessage = (msg, isErr) => {
        setMessage(msg);
        isErr ? setIsError(true) : setIsError(false);
        setIsMessageVisible(true);
        setTimeout(() => {
            setIsMessageVisible(false);
        }, 2000)
    }


    return (
        <>
            {
                isLoaderVisible &&
                <Loader />
            }
            {
                isMessageVisible &&
                <div className={`${styles.message} ${isError ? styles.error : styles.pass}`}>
                    <span>{message}</span>
                    <span>{isError ? "❌" : "✔"}</span>
                </div>
            }
            <div className={styles.container}>
                <span className={styles.link}><Link to="/get">Get details</Link></span>

                <div>
                    <button onClick={() => tabChange("token")}>Token Details</button>
                    <button onClick={() => tabChange("prize")}>Prize Details</button>
                    <button onClick={() => tabChange("payment")}>Payment Details</button>
                </div>
                <div>
                    {
                        isVisible === true && tab === "token" && <div id="token" className={styles.tab}>
                            <TokenPostDetails togglePreLoader={togglePreLoader} setDisplayMessage={setDisplayMessage} />
                        </div>
                    }
                    {
                        isVisible === true && tab === "prize" && <div id="prize">
                            <PrizePostDetails togglePreLoader={togglePreLoader} setDisplayMessage={setDisplayMessage} />
                        </div>
                    }
                    {
                        isVisible === true && tab === "payment" && <div id="payment" className={styles.tab}>
                            <PaymentPostDetails togglePreLoader={togglePreLoader} setDisplayMessage={setDisplayMessage} />

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PostDetails;