import React, { useRef, useState } from "react";
import FetchAllPaymentDetails, { FetchAllPaymentDetailsbyReference, FetchAllPaymentDetailsbyTokenNumber } from "../../Store/FetchPaymentDetails";
import { FetchAllReference } from "../../Store/FetchTokenDetails";
import { monthArray } from "../../Store/helper";

import styles from "./PaymentGetDetails.module.css";


const PaymentGetDetails = (props) => {

    const [paymentdata, setPaymentdata] = useState([]);
    const [displayOutput, setDisplayOutput] = useState(false);
    const [state, setState] = useState("token");
    const [reference, setReference] = useState([]);
    const tokenRef = useRef();
    const referenceRef = useRef();

    const sortMethod = (a, b) => {
        if (a.tokenNumber < b.tokenNumber) return -1;
        else return 1;
    };

    const convertDate = (d) => {
        var dat = new Date(d);
        const date = `${String(dat.getDate()).padStart(2, '0')}/${String(dat.getMonth() + 1).padStart(2, '0')}/${dat.getFullYear()}`;
        return date;
    }

    const RadioInputOnChangeHandler = async (stateString) => {
        setDisplayOutput(false);
        setState(stateString);

        if (stateString === "ref" && reference.length === 0) {
            const data = await FetchAllReference(props.setDisplayMessage);
            setReference(data);
        }
        if (stateString === "all") {
            const data = await FetchAllPaymentDetails(props.togglePreLoader,props.setDisplayMessage);
            if(data)
                setPaymentdata(data.sort(sortMethod));
            setDisplayOutput(true);
        }
    }

    const formSubmitHandler1 = async (e) => {
        e.preventDefault();
        const data = await FetchAllPaymentDetailsbyTokenNumber(tokenRef.current.value, props.togglePreLoader, props.setDisplayMessage);
        setPaymentdata(data);
        setDisplayOutput(true);
        e.target.reset();
    }
    const formSubmitHandler2 = async (e) => {
        e.preventDefault();
        const data = await FetchAllPaymentDetailsbyReference(referenceRef.current.value, props.togglePreLoader, props.setDisplayMessage);
        if(data)
            setPaymentdata(data.sort(sortMethod));
        setDisplayOutput(true);
        e.target.reset();
    }

    return (
        <div>
            <div className={styles.inputContainer}>
                <input type="radio" id="token" name="payment" value="token" defaultChecked onChange={() => RadioInputOnChangeHandler("token")}></input>
                <label htmlFor="token" className={styles.label}>By Token Number</label>
                <input type="radio" id="reference" name="payment" value="reference" onChange={() => RadioInputOnChangeHandler("ref")}></input>
                <label htmlFor="reference" className={styles.label}>By Reference</label>
                <input type="radio" id="all" name="payment" value="all" onChange={() => RadioInputOnChangeHandler("all")}></input>
                <label htmlFor="all" className={styles.label}>All</label>
            </div>
            {
                state === "token" &&
                <form onSubmit={formSubmitHandler1} className={styles.form}>
                    <label htmlFor="num">Enter the Token Number : </label>
                    <input id="num" type="number" ref={tokenRef} placeholder="token" required></input>
                    <button type="submit">Fetch</button>
                </form>
            }

            {
                state === "ref" &&
                <form onSubmit={formSubmitHandler2} className={styles.form}>
                    <label htmlFor="ref">Select the reference : </label>
                    <select id="ref" ref={referenceRef} required>
                        <option defaultChecked>Select reference</option>
                        {
                            reference && reference.map(ele => <option style={{ padding: "10px !important" }} key={ele} value={ele}>{ele}</option>)
                        }
                    </select>
                    <button type="submit">Fetch</button>
                </form>
            }

            {
                displayOutput && <div className={styles.container}>
                    {
                        paymentdata && paymentdata.map(ele => {
                            return <div key={ele.tokenNumber}>
                                <div className={styles.bigBox}>
                                    <span>
                                        {ele.tokenNumber}<br/>{ele.name}<br />{ele.reference}
                                    </span>
                                </div>
                                <div className={styles.longBox}>
                                    {paymentdata && ele.dateArray.map((el, i) => {
                                        return <span key={i} className={ele.dateArray[i] ? styles.cool : styles.danger}>
                                            {monthArray[i]}<br />{ele.dateArray[i] ? convertDate(ele.dateArray[i]) : "❌"}<br />{ele.modeArray[i] ? ele.modeArray[i] : "---------"}
                                        </span>
                                    })}
                                </div>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default PaymentGetDetails;