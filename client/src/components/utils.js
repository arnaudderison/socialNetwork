export const isEmpty = (value) =>{
    return (
        value === undefined ||
        value === null ||
        (typeof value == "object" && Object.keys(value).length === 0) ||
        (typeof value == "string" && value.trim().length === 0)
     )
}
export const DateParse = (num) =>{
    let options = {hour: '2-digit', minute: '2-digit', year: '2-digit', month: '2-digit', day: '2-digit'};
    let dateParser = Date.parse(num);
    let date = new Date(dateParser).toLocaleDateString('fr-FR', options)
    return date.toString(); 
}