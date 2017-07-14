import { extendObservable } from 'mobx'

export class SQStore {
  constructor() {
    extendObservable( this, {
      seasons: [2017],
      events: [],
      user: null,
      standings: []
    })
  }

  getStandings( year ) {
    if( year === null ) {
      year = this.getCurrentYear()
    }
    console.log( "Looking for standings for year ", year );
    var stnds = this.standings.filter( standing => standing.year === year );
    console.log( "Returning ", stnds )
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

}

const store = window.store = new SQStore()
export default store
