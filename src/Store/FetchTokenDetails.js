import GetDetailsOfMemberURL from "./helper";

const FetchDetailsByTokenNumber = async (tokenNumber, func, func2) => {
    func(true);
    const res = await fetch(`${GetDetailsOfMemberURL}${tokenNumber}`);
    if(!res.ok){
        func2("Failed to fetch member's details", true);
        func(false);
        return;
    }
    const data = await res.json();
    func(false);
    return data;
}

export const FetchDetailsByReference = async (ref, func, func2) => {
    func(true);
    const res = await fetch(`${GetDetailsOfMemberURL}reference/${ref}`);
    if(!res.ok){
        func2("Failed to fetch member's details", true);
        func(false);
        return;
    }
    const data = await res.json();
    func(false);
    return data;
}

export const FetchAllReference = async(func2) => {
    const res = await fetch(`${GetDetailsOfMemberURL}reference`);
    if(!res.ok){
        func2("failed to fetch all reference", true);
        return;
    }
    const data = await res.json();
    return data.sort((a,b) => {
        if(a>b) return 1;
        else return -1;
    });
}

export default FetchDetailsByTokenNumber;