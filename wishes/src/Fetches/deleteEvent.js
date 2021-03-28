require('dotenv').config()

export const deleteEvent=(auth,eventId)=>{

    let options = {
        method: 'DELETE',
        headers: {
          authentication: auth
        }
      };
return fetch(process.env.REACT_APP_SERVER_URL+"/events/"+eventId, options)
}