require('dotenv').config()

export const deleteWish=(auth,wishId)=>{

    let options = {
        method: 'DELETE',
        headers: {
          authentication: auth
        }
      };
return fetch(process.env.REACT_APP_SERVER_URL+"/wish/"+wishId, options)
}