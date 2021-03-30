require('dotenv').config()

export const editUser=(auth,obj)=>{
    let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authentication: auth
        },
        body: JSON.stringify(obj)
      };
return fetch(process.env.REACT_APP_SERVER_URL+"/editUser", options)
}