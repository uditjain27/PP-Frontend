import React, { useRef, useState } from "react";
import postByTokenNumber, { postByReference } from "../../Store/PostTokenDetails";

import style from "./TokenPostDetails.module.css";


const TokenPostDetails = (props) => {

    const [state, setState] = useState("");
    const [tokenArray, setTokenArray] = useState([]);
    const token1Ref = useRef();
    const tokenRef = useRef();
    const name1Ref = useRef();
    const name2Ref = useRef();
    const contact1Ref = useRef();
    const contact2Ref = useRef();
    const locality1Ref = useRef();
    const locality2Ref = useRef();
    const reference1Ref = useRef();
    const reference2Ref = useRef();

    const RadioInputOnChangeHandler = (stateString) => {
        setState(stateString);
    }

    const form1SubmitHandler = async (e) => {
        e.preventDefault();
        const data = {
            tokenNumber: Number(token1Ref.current.value),
            name: name1Ref.current.value,
            locality: locality1Ref.current.value,
            contactNumber: String(contact1Ref.current.value),
            reference: reference1Ref.current.value
        }
        await postByTokenNumber(data, props.togglePreLoader, props.setDisplayMessage);
        e.target.reset();

    }

    const form2SubmitHandler = async (e) => {
        e.preventDefault();
        const data = {
            //tokenNumber: Number(token1Ref.current.value),
            array: tokenArray,
            name: name2Ref.current.value,
            locality: locality2Ref.current.value,
            contactNumber: String(contact2Ref.current.value),
            reference: reference2Ref.current.value
        }
        await postByReference(data, props.togglePreLoader, props.setDisplayMessage);
        e.target.reset();
    }

    const tokenAddHandler = (e) => {
        const token = Number(tokenRef.current.value);
        tokenRef.current.value = "";
        if(token<1 || token>400){
            return;
        }
        setTokenArray([...tokenArray, token]);
    }

    return (
        <div>
            <div className={style.inputContainer}>
                <input type="radio" id="single" name="token" value="single" onChange={() => RadioInputOnChangeHandler("single")}></input>
                <label htmlFor="single" className={style.label}>By Token Number</label>
                <input type="radio" id="multiple" name="token" value="multiple" onChange={() => RadioInputOnChangeHandler("multiple")}></input>
                <label htmlFor="multiple" className={style.label}>By Reference</label>
            </div>

            {
                state === "single" &&
                <form onSubmit={form1SubmitHandler} className={style.form}>
                    <div>
                        <label>Token Number : </label>
                        <input type="number" placeholder="Token" ref={token1Ref} required></input>
                    </div>
                    <div>
                        <label>Name : </label>
                        <input type="text" placeholder="Name" ref={name1Ref} required></input>
                    </div>
                    <div>
                        <label>Contact Number : </label>
                        <input type="tel" placeholder="Phone Number" ref={contact1Ref} required></input>
                    </div>
                    <div>
                        <label>Locality : </label>
                        <input type="text" placeholder="Area" ref={locality1Ref} required></input>
                    </div>
                    <div>
                        <label>Reference : </label>
                        <input type="text" placeholder="Reference" ref={reference1Ref} required></input>
                    </div>
                    <div>
                        <button type="submit">Add New Member</button>
                    </div>
                </form>
            }

            {
                state === "multiple" &&
                <form onSubmit={form2SubmitHandler} className={style.form}>
                    <div>
                        <label>Name : </label>
                        <input type="text" placeholder="Name" ref={name2Ref} required></input>
                    </div>
                    <div>
                        <label>Contact Number : </label>
                        <input type="tel" placeholder="Phone Number" ref={contact2Ref} required></input>
                    </div>
                    <div>
                        <label>Locality : </label>
                        <input type="text" placeholder="Area" ref={locality2Ref} required></input>
                    </div>
                    <div>
                        <label>Reference : </label>
                        <input type="text" placeholder="Reference" ref={reference2Ref} required></input>
                    </div>
                    <div>
                        <label>Token Number : </label>
                        <input type="number" placeholder="Token" ref={tokenRef}></input>
                        <span onClick={tokenAddHandler} style={{width:"50px", display:"inline-block", backgroundColor:"#F39C12", textAlign:"center", padding:"0px 7px 7px 7px", marginInline:"15px", borderRadius:"2px", color:"#fff", fontSize:"25px", fontWeight:"900"}}>+</span>
                    </div>
                    <div style={{width : "100%", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                        {
                            tokenArray.map(ele => <span key={ele} className={style.tokenButton}>{ele}</span>)
                        }
                    </div>

                    <div>
                        <button type="submit">Add New Member</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default TokenPostDetails;