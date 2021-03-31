require('dotenv').config()

export const getUserEvents=(id)=>
{

      
      return fetch(process.env.REACT_APP_SERVER_URL+"/userEvents/"+id);
}