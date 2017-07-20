var axios = require('axios');

var domain = "http://api.sqology.tracerite.com";

module.exports = {
  
  fetchEvents: function( year ) {
    return axios.get( domain + "/events", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },

  fetchLeaderboard: function( year ) {
    return axios.get( domain + "/leaderboards", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },

  fetchStandings: function( year ) {
    return axios.get( domain + "/standings", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },

  fetchEventResults: function( id ) {
    return axios.get( domain + "/event/scores/" + id)
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
  },

  fetchCompetitor: function( id ) {
    return axios.get( domain + "/competitor/" + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },
}
