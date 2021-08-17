import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import axios from 'axios';


export default class App extends Component {

  // constructor started-----------
  constructor(){
    super();

    this.state={

      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }


      // checLoginStatus method------------------------
  checkLoginStatus(){
    axios.get("http://localhost:3001/logged_in", { withCredentials: true } ).then(response => {


    if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){

      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: response.data.user
      })

    } else if (!response.data.logged_in & this.state.loggedInStatus === "LOGGED_IN"){

    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })

  }
    
    }).catch( error => {
      console.log("check login error ", error);
    });

  }


  // componentDidMount method---------------------
 componentDidMount(){

  this.checkLoginStatus();

 }

//  for logout method-------------------
  handleLogOut(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }


   // handle login method------------------------

   handleLogin(data){

    this.setState({
      loggedInStatus: "LOGGED_IN SUCCESSFULLY",
      user: data.user
    })
  } 


  render() {
    return (
      <div className="app">

        <BrowserRouter>
          <Switch>
            <Route 
              exact
              path={"/"} 
              render={props => (
              <Home
               {...props} 
              handleLogin={this.handleLogin} 
              handleLogOut={this.handleLogOut}
              loggedInStatus={this.state.loggedInStatus}
               /> 

              )}/>

            <Route
              exact 
              path ={"/dashboard"} 
              render={props => (
              <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} /> 
              )}
            /> 

          </Switch>
        </BrowserRouter>
        
      </div>
    )
  }
}



