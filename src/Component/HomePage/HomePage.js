import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Link } from 'react-router-dom';

import styles from './HomePage.module.css';
import animationData from "../../Lottie/group-discusion.json";

function HomePage() {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

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

    return (
        <div className={styles.container}>
            <div className={styles.innerflex}>
                <p>Rishabh Group<span role="img" aria-label="visible">🙏🙏</span></p>
                <Link to="/get">Get Details</Link>
                <Link to="/post">Feed Details</Link>
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