import { PrizeURL } from "./helper";

const GetPrizeDetails = async (func, func2) => {
    func(true);
    const res = await fetch(`${PrizeURL}`);
    if(!res.ok){
        func2("failed to fetch prize details", true);
        func(false);
        return;
    }
    const data = await res.json();
    func(false);
    return data;
}

export default GetPrizeDetails;