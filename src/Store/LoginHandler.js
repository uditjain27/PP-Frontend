import { loginURL } from "./helper"

const LoginHandler = async (obj) => {
    const res = await fetch(loginURL,{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(obj)
    })

    if(!res.ok){
        return false;
    }
    const data = await res.json();
    return data;
}

export default LoginHandler;