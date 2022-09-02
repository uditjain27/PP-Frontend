import React, { useState } from "react";
import { Link } from "react-router-dom";
import TokenGetDetails from "./TokenGetDetails";
import styles from "./GetDetails.module.css"
import PrizeGetDetails from "./PrizeGetDetails";
import PaymentGetDetails from "./PaymentGetDetails";
import Loader from "./../HomePage/Loader";

function GetDetails() {

    const [isVisible, setIsVisible] = useState(false);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [tab, setTab] = useState();
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [message, setMessage] = useState("User added successfu l ly successfully");
    const [isError, setIsError] = useState(false);


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
                <Link to="/post">Post Details </Link>
                <div>
                    <button onClick={() => tabChange("token")}>Token Details</button>
                    <button onClick={() => tabChange("prize")}>Prize Details</button>
                    <button onClick={() => tabChange("payment")}>Payment Details</button>
                </div>
                <div>
                    {isVisible === true && tab === "token" && <div id="token" className={styles.taby}>
                        <TokenGetDetails togglePreLoader={togglePreLoader} setDisplayMessage={setDisplayMessage} />
                    </div>}
                    {isVisible === true && tab === "prize" && <div id="prize" className={styles.taby}>
                        <PrizeGetDetails togglePreLoader={togglePreLoader} setDisplayMessage={setDisplayMessage} />
                    </div>}
                    {isVisible === true && tab === "payment" && <div id="payment" className={styles.taby}>
                        <PaymentGetDetails togglePreLoader={togglePreLoader} setDisplayMessage={setDisplayMessage} />
                    </div>}
                </div>
            </div>
        </>
    )
}

export default GetDetails;