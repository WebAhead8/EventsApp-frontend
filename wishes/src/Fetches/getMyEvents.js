require('dotenv').config()

export const getMyEvents=(auth)=>{
    let options = {
        method: 'GET',
        headers: {
          authentication: auth
        }
      };
return fetch(process.env.REACT_APP_SERVER_URL+"/myEvents", options)
}