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

  fetchLeaderboard: function( year ) {
    return axios.get("http://sqology.tracerite.com/static/leaderboard.json", {
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
  },

  fetchEventResults: function( id ) {
    return axios.get("http://sqology.tracerite.com/static/event_" + id + ".json")
    .then( function( response ) {
      console.log( "response: ", response.status );
      return response.data;
    })
    .catch( function( er ) {
      console.log( er );
      if( er.response ) {
       // console.log("RESPONSE: ", er.repsonse );
      }
      else if( er.request ) {
       // console.log( "REQUEST: ", er.request );
      }
      return null;
    });
  }
}
