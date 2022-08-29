import { PrizeURL } from "./helper";

const postPrizeDetails = async (obj, func, func2) => {
    func(true);
    const res = await fetch(PrizeURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if (!res.ok) {
        func2("failed to feed prize data", true);
        func(false);
        return;
    }
    func2("Prize info added successfully", false);
    func(false);
}

export default postPrizeDetails;