import React, {Component} from 'react';

import { observer, inject } from 'mobx-react';
import {ListItem} from 'material-ui/List';

const Competitor = inject('store')( observer (class Competitor extends Component {
 
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
       <div>Competitor page</div>
    )
  }
}))

export default Competitor

