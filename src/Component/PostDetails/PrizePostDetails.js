import React, { useRef, useState } from "react";

import style from "./TokenPostDetails.module.css";
import { monthArray, fetchMonth } from "../../Store/helper";
import postPrizeDetails from "../../Store/PostPrizeDetails";

const PrizePostDetails = (props) => {

    const prize1Ref = useRef();
    const prize2Ref = useRef();
    const prize3Ref = useRef();
    const prize4Ref = useRef();
    const prize5Ref = useRef();
    const prize6Ref = useRef();
    const monthRef = useRef();

    const [month, setMonth] = useState("");

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const data = {
            mainCashPrize : Number(prize1Ref.current.value),
            firstCashPrize : Number(prize2Ref.current.value),
            secondCashPrize : Number(prize3Ref.current.value),
            firstPrize : Number(prize4Ref.current.value),
            secondPrize : Number(prize5Ref.current.value),
            thirdPrize : Number(prize6Ref.current.value),
            month : fetchMonth(monthArray[month].slice(0, 3)),
            year : monthArray[month].slice(4, 8)
        }
        await postPrizeDetails(data, props.togglePreLoader, props.setDisplayMessage);
        e.target.reset();
    }

    return (
        <form onSubmit={formSubmitHandler} className={style.form}>
            <div>
                <select id="ref" ref={monthRef} onChange={() => setMonth(monthRef.current.value)} required>
                    <option defaultChecked>Select Month</option>
                    {
                        monthArray.map((ele, i) => <option style={{ padding: "10px !important" }} key={i} value={i}>{ele}</option>)
                    }
                </select>
            </div>
            <div>
                <label>51000/- : </label>
                <input type="number" placeholder="token number" ref={prize1Ref} required></input>
            </div>
            <div>
                <label>2100/- : </label>
                <input type="number" placeholder="token number" ref={prize2Ref} required></input>
            </div>
            <div>
                <label>1100/- : </label>
                <input type="number" placeholder="token number" ref={prize3Ref} required></input>
            </div>
            <div>
                <label>1st prize : </label>
                <input type="number" placeholder="token number" ref={prize4Ref} required></input>
            </div>
            <div>
                <label>2nd Prize : </label>
                <input type="number" placeholder="token number" ref={prize5Ref} required></input>
            </div>
            <div>
                <label>3rd Prize : </label>
                <input type="number" placeholder="token number" ref={prize6Ref} required></input>
            </div>

            <div>
                <button type="submit">Add Prize Details for month : {month ? monthArray[month] : "--"}</button>
            </div>
        </form>
    );
}

export default PrizePostDetails;