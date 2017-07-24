import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import Layout from '../container/Layout';

const Login = inject('store')( observer (class Login extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      password:'',
      snackbarOpen: false,
      snackbarMessage:"Username/password failed"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.processLogin = this.processLogin.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({[name]:value});
  }

  handleSubmit() {
    this.props.store.login(this.state, this.processLogin);
  }

  processLogin( result ) {
    if( result.msg === 'OK' ) {
      this.props.history.push('/');
    }
    else {
      this.setState({snackbarOpen:true, password:''});
    }
  }

  render() {
    return(
      <Layout>
      <div>
        <h3>Login</h3>
        <Paper zDepth={1}>
          <div style={{padding:'5px'}}>
            <TextField name="email" 
                       hintText="Email" 
                       value={this.state.email} 
                       type="email"
                       onChange={this.handleChange}/>
            <br />
            <TextField name="password" 
                       hintText="Password" 
                       value={this.state.password} 
                       type="password"
                       onChange={this.handleChange}
            />
          </div>
        </Paper>
        <div style={{width:'100%', marginTop:5}}>
          <RaisedButton label="Login" onTouchTap={this.handleSubmit} secondary={true} /> 
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
        />
      </div>
      </Layout>
    )
  }
}))

export default Login

