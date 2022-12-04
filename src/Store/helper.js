//const baseURL = `http://www.localhost:8080/`;
const baseURL = `https://newproject-baf80.el.r.appspot.com/`;

export const loginURL = `${baseURL}login`;
const GetDetailsOfMemberURL = `${baseURL}member/`;
export const PrizeURL = `${baseURL}prize/`;
export const PaymentURL = `${baseURL}payment/`;

export const monthArray = [
    "May 2022",
    "Jun 2022",
    "Jul 2022",
    "Aug 2022",
    "Sep 2022",
    "Oct 2022",
    "Nov 2022",
    "Dec 2022",
    "Jan 2023",
    "Feb 2023",
    "Mar 2023",
    "Apr 2023",
    "May 2023",
    "Jun 2023",
    "Jul 2023",
    "Aug 2023",
    "Sep 2023",
    "Oct 2023",
    "Nov 2023",
    "Dec 2023",
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
    "Jul 2024",
    "Aug 2024",
    "Sep 2024",
    "Oct 2024",
    "Nov 2024",
    "Dec 2024"
];

export const fetchMonth = function (mon) {
    switch (mon) {
        case "Jan": return "January";
        case "Feb": return "February";
        case "Mar": return "March";
        case "Apr": return "April";
        case "May": return "May";
        case "Jun": return "June";
        case "Jul": return "July";
        case "Aug": return "August";
        case "Sep": return "September";
        case "Oct": return "October";
        case "Nov": return "November";
        case "Dec": return "December";
        default: return "";
    }
}


export default GetDetailsOfMemberURL;