import { PaymentURL } from "./helper";

const postByTokenNumber = async (obj, func, func2) => {
    func(true);
    const res = await fetch(PaymentURL, {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(obj)
    });
    if(!res.ok){
        func2("Failed to post payment details", true);
        func(false);
        return;
    }
    func2("Payment details posted successfully", false);
    func(false);
}

export const postByReference = async (obj, func, func2) => {
    func(true);
    const res = await fetch(`${PaymentURL}reference`, {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(obj)
    });
    if(!res.ok){
        func2("Failed to post payment details", true);
        func(false);
        return;
    }
    func2("Payment details posted successfully", false);
    func(false);
}


export default postByTokenNumber;