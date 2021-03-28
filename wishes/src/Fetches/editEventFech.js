require('dotenv').config()

export const editEvent=(auth,obj)=>{
    console.log(obj)
    console.log(auth)
    let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authentication: auth
        },
        body: JSON.stringify(obj)
      };
return fetch(process.env.REACT_APP_SERVER_URL+"/events", options)
}