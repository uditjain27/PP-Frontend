import React from "react";
import Lottie from "react-lottie";
import { Link } from 'react-router-dom';

import styles from './HomePage.module.css';
import animationData from "../../Lottie/group-discusion.json";

function HomePage() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerflex}>
                <p>Rishabh Group<span role="img" aria-label="visible">🙏🙏</span></p>
                <Link to="/get">Get Details</Link>
                <Link to="/post">Feed Details</Link>
            </div>
            <Lottie options={defaultOptions}
                height={700}
                width={700}
                style={{
                    margin: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-around"
                }}
            >
            </Lottie>

        </div >
    )
}

export default HomePage;