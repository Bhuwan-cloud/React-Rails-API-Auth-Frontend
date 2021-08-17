import React, { Component } from 'react'
import Login from './auth/Login';
import axios from 'axios';
import Registration from './auth/Registration'
import { response } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends Component {
    constructor(props){
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data){
        // todo update parent component 
        this.props.handleLogin(data);
        this.props.history.push("/dashboard"); 

    }

    handleLogoutClick(){

        axios.delete("http://localhost:3001/logout", {withCredentials: true}).then(response => {
        this.props.handleLogOut();
        }).catch(error => {
            console.log("logout error",error);
        })
    }

 
    render() {
        return (
            <div >
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div style={{margin:"20px"}}>
                        <p> Note: To get this App's 'BackEnd Rails API' visit the <a href=""> <button style={{backgroundColor:"blue", color:"white"}}> GitHub Link </button> </a> and fork the Rails project from GitHub </p>
                        <h1 style={{color:"darkgreen"}}>  HOMEPAGE build with React.js</h1>
                        <p>  by clicking on Register  button your data will be sent to Rails API server in port  3001 </p> 
                        <button onClick={()=> this.handleLogoutClick()} style={{backgroundColor:"red", height:"40px", width:"80px",color:"white",fontWeight:"bold"}}> Logout </button>
                        <h3 > status: {this.props.loggedInStatus}</h3>
                    </div>
                    <div style={{margin:"50px"}}>
                        <Link to="/dashboard">
                            <button style={{ height:"40px", width:"100px", backgroundColor:"lightblue", fontWeight:"bold"}}> Dashboard </button>
                        </Link>
                    </div>
                </div>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}> </Registration> <br/> <br/>
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>
        )
    }
}
