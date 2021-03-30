require('dotenv').config()

export const getUserByToken=(auth,eventId)=>{

    let options = {
        method: 'GET',
        headers: {
          authentication: auth
        }
      };
return fetch(process.env.REACT_APP_SERVER_URL+"/userToken", options)
}