var axios = require('axios');

var domain = "http://api.sqology.tracerite.com";
//var domain = "http://localhost:8000";
//var domain = "http://192.168.2.15:8000";
var googleKey = 'AIzaSyB2vN93fC9izvgVLq6ytMUWZTEP1wXQz-U';
var distanceUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=ORIGIN_ZIP&destinations=DESTINATION_ZIP&key=AIzaSyB2vN93fC9izvgVLq6ytMUWZTEP1wXQz-U'

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
    return axios.get( domain + "/leaderboards/all", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },

  fetchStandings: function( year ) {
    return axios.get( domain + "/standings/all", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },

  fetchEventResults: function( id ) {
    return axios.get( domain + "/events/scores/" + id)
    .then( function( response ) {
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

  fetchCompetitors: function() {
    return axios.get( domain + "/competitors/names", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( function( response ) {
        return response.data;
      });
  },

  addEventScore: function( data, cb ) {
    return axios.post( domain + "/events/addScore", data )
    .then( function(response) {
      cb(response.data);
    });
  },

  addCompetitor: function( data, cb ) {
    return axios.post( domain + "/competitors/add", data )
    .then( function(response) {
      return response.data;
    });
  },

  markCompleted: function( id, cb ) {
    return axios.post( domain + "/events/markCompleted", {id:id} )
    .then( function(response) {
      return response.data;
    });
  }
  /*
  findDistance: function( origin, destination ) {
    var url = distanceUrl.replace(/DESTINATION_ZIP/, destination).replace(/ORIGIN_ZIP/, origin);
    return axios.get( url ).then( function(response) {
      var distance = response.data.rows[0].elements[0].distance.value;
      console.log( "Distance is " + distance );
    });
  }
  */
}
