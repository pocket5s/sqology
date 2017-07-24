import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import api from '../api';
import Layout from '../container/Layout';

const AddCompetitor = inject('store')( observer (class AddCompetitor extends Component {
  
  constructor(props) {
    super(props)
    this.state = {eventId: this.props.match.params.id,
                  competitorId:'',
                  compName:'', 
                  email:'', 
                  vehicle:'', 
                  zip:'', 
                  team:'',
                  snackbarOpen:false, 
                  snackbarMessage:'Competitor Saved. You may add another'}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.closeMe = this.closeMe.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({[name]:value});
  }

  handleSubmit() {
    var data = {
      name:this.state.compName,
      email:this.state.email,
      vehicle:this.state.vehicle,
      team:this.state.team,
      zip:parseInt(this.state.zip,10)
    };

    this.props.store.addCompetitor( data, this.resetFields );
  }

  resetFields( response ) {
      this.setState({
        competitorId:response.competitorId,
        compName:'',
        email:'',
        zip:'',
        vehicle:'',
        team:'',
        snackbarMessage:response.name + " saved.",
        snackbarOpen:true
      });
  }

  closeMe() {
    this.props.history.push('/addEventScore/' + this.state.eventId + '/' + this.state.competitorId);
  }

  render() {
    const style = {
      margin:5
    }
    return(
      <Layout>
      <div>
        <h3>Add Competitor</h3>
        <Paper zDepth={1}>
          <div style={{padding:'5px'}}>
            <TextField name="compName" 
                       hintText="Name" 
                       value={this.state.compName} 
                       errorText={this.state.nameError} 
                       onChange={this.handleChange}/>
            <br />
            <TextField name="email" 
                       hintText="Email" 
                       value={this.state.email} 
                       onChange={this.handleChange} />
            <br />
            <TextField name="vehicle" 
                       hintText="Vehicle" 
                       value={this.state.vehicle} 
                       onChange={this.handleChange} />
            <br />
            <TextField name="zip" 
                       hintText="Zipcode" 
                       value={this.state.zip} 
                       errorText={this.state.zipError} 
                       onChange={this.handleChange} />
            <br />
            <TextField name="team" 
                       hintText="Team" 
                       value={this.state.team} 
                       onChange={this.handleChange} />
          </div>
        </Paper>
        <div style={{width:'100%', marginTop:5}}>
          <RaisedButton label="Save" style={style} onTouchTap={this.handleSubmit} secondary={true} /> 
          <RaisedButton label="Done" style={style} onTouchTap={this.closeMe} /> 
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
      </Layout>

    );
  }

}));

export default AddCompetitor;
