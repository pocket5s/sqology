import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import AutoComplete from 'material-ui/AutoComplete';

import Layout from './Layout';

const AddEventScore = inject('store')( observer (class AddEventScore extends Component {
 
  constructor(props) {
    super(props)
    this.state = {eventId:null, 
                  mecaScore:'', 
                  iascaScore:'', 
                  distance:'', 
                  mecaError:'', 
                  iascaError:'', 
                  distanceError:'',
                  snackbarOpen:false,
                  snackbarMessage:'Score saved. You may enter another',
                  compNames:[]
                }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewEvent= this.viewEvent.bind(this);
    this.updateName = this.updateName.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleCompetitorChange = this.handleCompetitorChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.props.store.loadCompetitorNames();
  }

  componentDidMount() {
    this.setState({compNames: this.props.store.competitorNames});
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    
    if( name === 'mecaScore' && (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100) ) {
      this.setState({mecaError:'Value must be between 0 and 100'});
    }
    else {
      this.setState({mecaError:''});
    }
    if( name === 'iascaScore' && (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 268) ) {
      this.setState({iascaError:'Value must be between 0 and 268'});
    }
    else {
      this.setState({iascaError:''});
    }
    if( name === 'distance' && isNaN(value) ) {
      this.setState({distanceError:'Value must be a number'});
    }
    else {
      this.setState({distanceError:''});
    }
    this.setState({[name]:value});
  }

  handleEventChange(e, i, v) {
    this.setState({eventId:v})
  }

  handleCompetitorChange(e, i, v) {
    this.setState({competitorId:v})
  }

  updateName( chosen, index ) {
    this.setState({competitorId:chosen.value});
    this.setState({searchText:chosen.name});
  }

  handleRequestClose() {
    this.setState({snackbarOpen:false});
  }

  handleSubmit() {
    var data = {
      eventId:this.state.eventId,
      competitorId:this.state.competitorId,
      mecaScore:this.state.mecaScore,
      iascaScore:this.state.iascaScore,
      distance:this.state.distance
    };

    this.setState({
      eventId:this.state.eventId,
      competitorId:null,
      mecaScore:'',
      iascaScore:'',
      distance:'',
      searchText:'',
      snackbarOpen:true
    });

  }

  viewEvent() {
    this.props.history.push('/');
  }

  render() {
    const dataSourceConfig = {
      text:'name',
      value:'id'
    }
    return(
      <Layout>
      <div style={{marginLeft:5}}>
        <h3>Add Competitor Score</h3>
        <Paper zDepth={1}>
          <div style={{padding:'5px'}}>
            <SelectField
              value={this.state.eventId}
              floatingLabelText="Event"
              onChange={this.handleEventChange}
            >
              {this.props.store.events.map( function(item, index) {
                return (<MenuItem key={item.name} value={item.id} primaryText={item.name} />)
              })}
            </SelectField>
            <br />
            <SelectField
              value={this.state.competitorId}
              floatingLabelText="Competitor"
              onChange={this.handleCompetitorChange}
              >
              {this.props.store.competitorNames.map( function(item, index) {
                return( <MenuItem key={item.id} value={item.id} primaryText={item.name} />)
              })}
            </SelectField>
            <br />
            <TextField name="mecaScore" 
                       hintText="MECA Score" 
                       value={this.state.mecaScore} 
                       errorText={this.state.mecaError} 
                       onChange={this.handleChange}/>
            <br />
            <TextField name="iascaScore" 
                       hintText="IASCA Score" 
                       value={this.state.iascaScore} 
                       errorText={this.state.iascaError} 
                       onChange={this.handleChange} />
            <br />
            <TextField name="distance" 
                       hintText="Distance" 
                       value={this.state.distance} 
                       errorText={this.state.distanceError} 
                       onChange={this.handleChange} />
            <br />
          </div>
        </Paper>
        <div style={{width:'100%', marginTop:5}}>
          <RaisedButton label="Save & Add Another" onTouchTap={this.handleSubmit} secondary={true} /> 
          <RaisedButton label="Done" onTouchTap={this.viewEvent} /> 
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
      </Layout>
    )
  }
}))

export default AddEventScore
