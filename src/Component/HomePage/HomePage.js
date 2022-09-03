import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import { Link } from 'react-router-dom';

import styles from './HomePage.module.css';
import animationData from "../../Lottie/group-discusion.json";
import LoginHandler from "../../Store/LoginHandler";

function HomePage(props) {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )
    const [isError, setIsError] = useState(false);

    const userRef = useRef();
    const passRef = useRef();

    useEffect(() => {
        window
            .matchMedia("(min-width: 1000px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        setIsError(false);
        console.log(userRef.current.value);
        console.log(passRef.current.value);
        const response = await LoginHandler({
            "user": userRef.current.value,
            "pass": passRef.current.value
        });
        console.log(response);
        if (!response) {
            setIsError(true);
            return;
        }
        //call login api
        props.setIsLogin(response);
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerflex}>
                <p>Rishabh Group<span role="img" aria-label="visible">🙏🙏</span></p>
                {!props.isLogin &&
                    <>
                        <form className={styles.form} onSubmit={loginHandler}>
                            <div>
                                <label htmlFor="username">Username : </label>
                                <input id="username" type="text" ref={userRef} required autoComplete="off"></input>
                            </div>
                            <div>
                                <label htmlFor="password">Password : </label>
                                <input id="password" type="password" ref={passRef} required autoComplete="off"></input>
                            </div>
                            {
                                isError && <div style={{color: "red", margin:"0", fontSize:"17px"}}>Invalid Credentials</div>
                            }
                            <div>
                                <button type="submit">Login</button>
                                </div>
                        </form>
                    </>
                }
                {

                    props.isLogin &&
                    <>
                        <Link to="/get">Get Details</Link>
                        <Link to="/post">Feed Details</Link>
                    </>
                }
            </div>
            {
                matches && <Lottie options={defaultOptions}
                    height={700}
                    width={700}
                >
                </Lottie>
            }

        </div >
    )
}

export default HomePage;