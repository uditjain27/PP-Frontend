import React, { useRef, useState } from "react";
import FetchDetailsByTokenNumber, { FetchAllReference, FetchDetailsByReference } from "../../Store/FetchTokenDetails";

import styles from "./TokenGetDetails.module.css";

const TokenGetDetails = function (props) {

    const [view, setView] = useState();
    const [displayOutput, setDisplayOutput] = useState();
    const [detailsByToken, setDetailsByToken] = useState({});
    const [reference, setReference] = useState([]);
    const [referenceDetails, setReferenceDetails] = useState([]);
    const tokenRef = useRef();
    const referenceRef = useRef();

    const changeView = async function (viewString) {
        setDisplayOutput(false);
        setView(viewString);
        if (viewString === "reference") {
            await get();
        }
    }

    const form1SubmitHandler = async (e) => {
        e.preventDefault();
        if (tokenRef.current.value > 400 || tokenRef.current.value < 1){
            props.setDisplayMessage("Invalid Token Number", true);
            return;
        }
            
        setDetailsByToken(await FetchDetailsByTokenNumber(tokenRef.current.value,props.togglePreLoader, props.setDisplayMessage));
        setDisplayOutput(true);
        e.target.reset();
    }

    const form2SubmitHandler = async () => {
        setDisplayOutput(false);
        setReferenceDetails(await FetchDetailsByReference(referenceRef.current.value, props.togglePreLoader, props.setDisplayMessage));
    }

    const get = async () => {
        const data = await FetchAllReference(props.setDisplayMessage);
        setReference(data);
    }

    const tokenOnClickHandler = (token) => {
        setDetailsByToken(referenceDetails.filter(ele => ele.tokenNumber === token)[0]);
        setDisplayOutput(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <div onClick={() => changeView("token")}>Search by Token Number</div>
                <div onClick={() => changeView("reference")}>Search by Reference</div>
            </div>
            <div>
                {view === "token" &&
                    <form className={styles.form} onSubmit={form1SubmitHandler}>
                        <label htmlFor="num">Enter your Token Number : </label>
                        <input id="num" type="number" ref={tokenRef} required></input>
                        <button type="submit">Fetch Info</button>
                    </form>
                }
                {view === "reference" && reference &&
                    <>
                        <form className={styles.form}>
                            <label htmlFor="ref">Select the reference : </label>
                            <select id="ref" ref={referenceRef} onChange={form2SubmitHandler} required>
                                <option defaultChecked>Select reference</option>
                                {
                                    reference && reference.map(ele => <option style={{ padding: "10px !important" }} key={ele} value={ele}>{ele}</option>)
                                }
                            </select>
                        </form>
                        {
                            referenceDetails &&
                            <div>
                                <div style={{ display: "block" }}>Token Numbers are : </div>
                                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                    {referenceDetails.map(
                                        ele => <span className={styles.tokenButton} onClick={() => tokenOnClickHandler(ele.tokenNumber)} key={ele.tokenNumber}>{ele.tokenNumber}</span>
                                    )}
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
            <div>
                {
                    displayOutput &&
                    <div className={styles.card}>
                        <div>
                            <span>Token Number : </span>
                            <span>{detailsByToken && detailsByToken.tokenNumber}</span>
                        </div>
                        <div>
                            <span>Name : </span>
                            <span>{detailsByToken && detailsByToken.name}</span>
                        </div>
                        <div>
                            <span>Contact Number : </span>
                            <span>{detailsByToken && detailsByToken.contactNumber}</span>
                        </div>
                        <div>
                            <span>Locality : </span>
                            <span>{detailsByToken && detailsByToken.locality}</span>
                        </div>
                        <div>
                            <span>Reference : </span>
                            <span>{detailsByToken && detailsByToken.reference}</span>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
};

export default TokenGetDetails;