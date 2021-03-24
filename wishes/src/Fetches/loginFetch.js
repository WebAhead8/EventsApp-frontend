require('dotenv').config()

export const loginFetch=(email,password)=>{
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:email,password:password})
      };
      
return fetch(process.env.REACT_APP_SERVER_URL+"/login", options)

}