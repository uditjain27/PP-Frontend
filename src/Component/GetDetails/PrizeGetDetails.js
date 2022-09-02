import React, { useEffect, useState } from "react";

import GetPrizeDetails from "./../../Store/FetchPrizeDetails";
import styles from "./PrizeGetDetails.module.css";

const PrizeGetDetails = (props) => {

    const [prizeList, setPrizeList] = useState([]);


    const f = async () => {
        const data = await GetPrizeDetails(props.togglePreLoader, props.setDisplayMessage);
        setPrizeList(data);
    }


    useEffect(() => {
        if(prizeList.length===0)
        {f();}
    }, [])


    return (
        <div className={styles.container}>
            <div>
                <span>Month</span>
                <span>51000/-</span>
                <span>2100/-</span>
                <span>1100/-</span>
                <span>1st Prize</span>
                <span>2nd Prize</span>
                <span>3rd Prize</span>
            </div>
            {
                prizeList && prizeList.map(ele => {
                    return <div key={ele.mainCashPrize}>
                        <span>{ele.month}<br/>{ele.year}</span>
                        <span>{ele.mainCashPrize}<br/>{ele.mainCashPrizeName}</span>
                        <span>{ele.firstCashPrize}<br/>{ele.firstCashPrizeName}</span>
                        <span>{ele.secondCashPrize}<br/>{ele.secondCashPrizeName}</span>
                        <span>{ele.firstPrize}<br/>{ele.firstPrizeName}</span>
                        <span>{ele.secondPrize}<br/>{ele.secondPrizeName}</span>
                        <span>{ele.thirdPrize}<br/>{ele.thirdPrizeName}</span>
                    </div>
                })
            }
        </div>
    )
}

export default PrizeGetDetails;