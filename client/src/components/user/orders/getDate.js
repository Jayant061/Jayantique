const getDeliveryDate = (date)=>{
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep",
                    "Oct","Nov","Dec"];
    const day = new Date(date).getDate();
    const month = months[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();
    return `${month} ${day}, ${year}`;
}
export default getDeliveryDate;