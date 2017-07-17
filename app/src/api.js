var axios = require('axios');

module.exports = {
  
  fetchEvents: function( year ) {
    return axios.get("http://sqology.tracerite.com/static/events.json", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },

  fetchStandings: function( year ) {
    return axios.get("http://sqology.tracerite.com/static/standings.json", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  }
}
