const getDeliveryDate = (date)=>{
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep",
                    "Oct","Nov","Dec"];
    const day = new Date(date).getDate();
    const month = months[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();

    const today = new Date();
    if(today.getDate() === day && today.getMonth() ===new Date(date).getMonth() &&
    today.getFullYear()===year){
        return "Today"
    }
    return `${month} ${day}, ${year}`;
}
export default getDeliveryDate;