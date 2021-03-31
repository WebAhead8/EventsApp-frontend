require('dotenv').config()

export const getUserByEmail=(email)=>
{
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:email})
      };
      
      return fetch(process.env.REACT_APP_SERVER_URL+"/userdetails", options)
}