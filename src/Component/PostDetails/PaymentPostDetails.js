import React, { useState, useRef } from "react";

import style from "./TokenPostDetails.module.css";

import postByTokenNumber, { postByReference } from "../../Store/PostPaymentDetails";
import { fetchMonth, monthArray } from "../../Store/helper";
import { FetchAllReference } from "../../Store/FetchTokenDetails";

const PaymentPostDetails = (props) => {

    const [state, setState] = useState("");
    const [reference, setReference] = useState([]);
    const tokenRef = useRef();
    const dateRef = useRef();
    const modeRef = useRef();
    const monthRef = useRef();
    const referenceRef = useRef();

    const RadioInputOnChangeHandler = async (stateString) => {
        setState(stateString);
        if (stateString === "multiple" && reference.length === 0) {
            const data = await FetchAllReference(props.setDisplayMessage);
            setReference(data);
        }
    }

    const form1SubmitHandler = async (e) => {
        e.preventDefault();
        const data = {
            token: Number(tokenRef.current.value),
            mode: modeRef.current.value,
            date: `${dateRef.current.value.slice(8, 10)}/${dateRef.current.value.slice(5, 7)}/${dateRef.current.value.slice(0, 4)}`,
            month: fetchMonth(monthArray[monthRef.current.value].slice(0, 3)),
            year: monthArray[monthRef.current.value].slice(4, 8)
        }
        await postByTokenNumber(data,props.togglePreLoader, props.setDisplayMessage);
        e.target.reset();
    }

    const form2SubmitHandler = async (e) => {
        e.preventDefault();
        const data = {
            reference: referenceRef.current.value,
            mode: modeRef.current.value,
            date: `${dateRef.current.value.slice(8, 10)}/${dateRef.current.value.slice(5, 7)}/${dateRef.current.value.slice(0, 4)}`,
            month: fetchMonth(monthArray[monthRef.current.value].slice(0, 3)),
            year: monthArray[monthRef.current.value].slice(4, 8)
        }
        await postByReference(data, props.togglePreLoader, props.setDisplayMessage);
        e.target.reset();
    }

    const mode = [
        "Cash",
        "Paytm",
        "PhonePe",
        "GooglePay",
        "UPI",
        "Account Adjust",
        "Advance"
    ];

    var today = new Date();
    today = today.toISOString().substr(0, 10);

    return (
        <div>
            <div className={style.inputContainer}>
                <input type="radio" id="single" name="token" value="single" onChange={() => RadioInputOnChangeHandler("single")}></input>
                <label htmlFor="single" className={style.label}>By Token Number</label>
                <input type="radio" id="multiple" name="token" value="multiple" onChange={() => RadioInputOnChangeHandler("multiple")}></input>
                <label htmlFor="multiple" className={style.label}>By Reference</label>
            </div>
            {
                state !== "" &&
                <form onSubmit={state === "single" ? form1SubmitHandler : form2SubmitHandler} className={style.form}>
                    {
                        state === "single" &&
                        <div>
                            <label htmlFor="number" style={{width: "200px"}}>Token Number : </label>
                            <input id="number" type="number" placeholder="token number" ref={tokenRef} required></input>
                        </div>
                    }
                    {
                        state === "multiple" &&
                        <div>
                            <label htmlFor="number" style={{width: "200px"}}>Reference : </label>
                            <select id="ref" ref={referenceRef} required>
                                <option defaultChecked>Select reference</option>
                                {
                                    reference && reference.map(ele => <option style={{ padding: "10px !important" }} key={ele} value={ele}>{ele}</option>)
                                }
                            </select>
                        </div>
                    }
                    <div>
                        <label htmlFor="date" style={{width: "200px"}}>Date : </label>
                        <input type="date" id="date" defaultValue={today} ref={dateRef} required></input>
                    </div>
                    <div>
                        <label htmlFor="month" style={{width: "200px"}}>Payment for month : </label>
                        <select id="month" ref={monthRef} required>
                            <option defaultChecked value="null">Select month</option>
                            {
                                monthArray.map((ele, i) => <option style={{ padding: "10px !important" }} key={i} value={i}>{ele}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="mode" style={{width: "200px"}}>Mode : </label>
                        <select id="mode" ref={modeRef} required>
                            <option defaultChecked value="null">Select Mode</option>
                            {
                                mode.map(ele => <option style={{ padding: "10px !important" }} key={ele} value={ele}>{ele}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <button type="submit">Post payment details</button>
                    </div>
                </form>
            }
        </div>
    );
}

export default PaymentPostDetails;