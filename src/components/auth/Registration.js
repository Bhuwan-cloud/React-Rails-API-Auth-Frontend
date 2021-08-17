import React, { Component } from 'react'
import axios from 'axios';
import { response } from 'react';
export default class Registration extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation:"",
            registrationErrors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // handle change event block --------------------
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value

        })
        console.log("handle change", event)

    }
    // handle submit event block--------------------
    handleSubmit(event){

        const{  email, password,  password_confirmation   } = this.state;
            
        axios.post("http://localhost:3001/registrations", {
            user:{
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }

            },
         
            { withCredentials: true   }
          
        ).then(response => {

            if (response.data.status === 'created')
            {
            this.props.handleSuccessfulAuth(response.data);
            }

        }).catch(error =>{

            console.log("registration Error", error);
        });
        event.preventDefault();
    } 

  
    render() {
        return (
            <div>
                <h3 style={{color:"green",display:"flex",justifyContent:"center"}}> Form for Registration </h3>
                <div style={{display:"flex",justifyContent:"center"}}> 

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

                        <input type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password " 
                            value={this.state.password_confirmation} 
                            onChange={this.handleChange} 
                            style={{height:"30px"}}
                            required
                        /> <br/> <br/>

                        <button style={{height:"30px", backgroundColor:"blue", color:"white",fontWeight:"bold"}} 
                        type="submit"> Register</button>
                    </form>
                </div>
            </div>
        )
    }
}
