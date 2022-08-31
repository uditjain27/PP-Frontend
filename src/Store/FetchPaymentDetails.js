import { PaymentURL } from "./helper";

const FetchAllPaymentDetails = async (func, func2) => {
    func(true);
    const res = await fetch(`${PaymentURL}`);
    if(!res.ok){
        func2("Failed to fetch payment details.", true);
        func(false);
        return;
    }

    const data = await res.json();
    func(false);
    return data;
}

export const FetchAllPaymentDetailsbyTokenNumber = async(token, func, func2) => {
    func(true);
    const res = await fetch(`${PaymentURL}${token}`);
    if(!res.ok){
        func2("Failed to fetch payment details.", true);
        func(false);
        return;
    }

    const data = await res.json();
    var arr =[];
    arr.push(data);
    func(false);
    return arr;
}

export const FetchAllPaymentDetailsbyReference = async(ref, func, func2) => {
    func(true);
    const res = await fetch(`${PaymentURL}reference/${ref}`);
    if(!res.ok){
        func2("Failed to fetch payment details.", true);
        func(false);
        return;
    }

    const data = await res.json();
    func(false);
    return data;
}

export default FetchAllPaymentDetails;