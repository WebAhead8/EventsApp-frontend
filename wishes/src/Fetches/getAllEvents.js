require('dotenv').config()

export const getAllEvents=()=>{
    let options = {method: 'GET'};
      
return fetch(process.env.REACT_APP_SERVER_URL+"/events", options)

}