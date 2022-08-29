import GetDetailsOfMemberURL from "./helper";

const postByTokenNumber = async (obj, func, func2) => {
    func(true);
    const res = await fetch(GetDetailsOfMemberURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if (!res.ok) {
        func2("failed to feed data", true);
        func(false);
        return;
    }
    func2("User added successfully", false);
    func(false);
}

export const postByReference = async (obj, func, func2) => {
    func(true);
    const res = await fetch(`${GetDetailsOfMemberURL}multiple`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if (!res.ok) {
        func2("failed to feed data", true);
        func(false);
        return;
    }
    func2(`${obj.array.length} users added successfully`, false);
    func(false);
}

export default postByTokenNumber;