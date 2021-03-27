require('dotenv').config()

export const getWishesForEvent=(id)=>{
    let options = {method: 'GET'};
return fetch(process.env.REACT_APP_SERVER_URL+"/events/"+id+"/wishes", options)
}