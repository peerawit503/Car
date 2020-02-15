import axios from 'axios'
import url from './url'




function allTeams() {

  let teams;

  axios.get(`${url}/team_all`)
    .then(res => {
      teams = res.data.message
    })
    .catch(err => console.log(err))
  return teams
}

export default allTeams
