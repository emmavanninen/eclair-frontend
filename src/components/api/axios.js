import Axios from 'axios'

export const createNewSession = async (user) => {

 console.log(user);
 

  try {
    let success = await Axios.post('/api/sessions/new-session', user)
    console.log(success.data)

    // return success.data
  } catch (e) {
    return e.response
  }
}
 