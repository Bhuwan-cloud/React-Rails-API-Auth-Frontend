import React, { Component } from 'react'
import axios from 'axios';
import { response } from 'react';
export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // handle change event block --------------------
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value

        })
    };
    // handle submit event block--------------------
    handleSubmit(event){

        const{  email, password   } = this.state;
            
        axios.post("http://localhost:3001/sessions", {
            user:{
                email: email,
                password: password,
            }

            },
         
            { withCredentials: true   }
          
        ).then(response => {


            if (response.data.logged_in)
            {
            this.props.handleSuccessfulAuth(response.data);
            }

        }).catch(error =>{

            console.log("login  Error", error);
        });
        event.preventDefault();
    } 

  
    render() {
        return (
            <div>
                <h3 style={{color:"green",display:"flex",justifyContent:"center"}}> Form for LogIn </h3>
                <div style={{display:"flex",justifyContent:"center",marginBottom:"50px"}}> 
                    
                    <form onSubmit={this.handleSubmit}>
                        <input type="email"
                        name="email"
                        placeholder="Enter Your Email " 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        style={{height:"30px"}}
                        required
                        /> <br/> <br/>
                        <input type="password"
                            name="password"
                            placeholder="Enter Your Password " 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            style={{height:"30px"}}
                            required
                        /> <br/> <br/>
                    
                        <button style={{height:"30px", backgroundColor:"blue", color:"white",fontWeight:"bold"}} 
                         type="submit"> Login </button>
                    </form>
                </div>
            </div>
        )
    }
}
