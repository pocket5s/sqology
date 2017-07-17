import { extendObservable } from 'mobx'
import api from './api'

export class SQStore {
  constructor() {
    extendObservable( this, {
      seasons: [2017],
      events: [],
      eventResults: [],
      user: null,
      standings: []
    })

    this.loadStandings();
    this.loadEvents();
  }

  getStandings( year ) {
    if( year === null ) {
      year = this.getCurrentYear()
    }
    if( this.standings.length === 0 ) {
      this.loadStandings();
    }
    var stnds = this.standings.filter( standing => standing.year === year );
    return stnds.listing;
  }

  getCurrentMonth() {
    var date = new Date();
    var month = date.getMonth() + 1
    return month;
  }

  getCurrentYear() {
    var date = new Date();
    var year = date.getYear()
    return year;
  }

  getUser() {
   return this.user;
  }

  loadEvents() {
    var e = this.events;
    api.fetchEvents( 2017 ).then( function(data) {
      data.slice().map(function(item) {
        return(
        e.push( {id: item.id,
                 name:item.name, 
                 date:new Date(item.date),
                 location: item.location,
                 address: item.address,
                 city: item.city,
                 state: item.state,
                 zip: item.zip,
                 notes: item.notes,
                 scoresPosted: item.scoresPosted
                } )
        )
      });
    });
  }

  loadStandings() {
    var e = this.standings;
    api.fetchStandings( 2017 ).then( function(data) {
      data.slice().map(function(item) {
      return(
        e.push( item )
      )
      })
    });
  }

  loadEventResults(id) {
    console.log( "Loading event results for " + id );
    var evResults = this.eventResults;
    console.log( "Could find any locally, checking api" );
    api.fetchEventResults( id ).then( function(data) {
      if( data !== null ) {
        evResults.push( data );
      }
      else {
        throw "No results for the selected event"
      }
    });
  }
}

const store = window.store = new SQStore()
export default store
