import { extendObservable } from 'mobx'
import api from './api'

export class SQStore {
  constructor() {
    extendObservable( this, {
      seasons: [2017],
      events: [],
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
        e.push( {name:item.name, date:new Date(item.date)} );
      });
    });
  }

  loadStandings() {
    var e = this.standings;
    api.fetchStandings( 2017 ).then( function(data) {
      data.slice().map(function(item) {
        e.push( item );
      });
    });
  }
}

const store = window.store = new SQStore()
export default store
