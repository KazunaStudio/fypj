import React, {Component, useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import {NavLink} from 'react-router-dom';

import "./Login.css";
import { Container } from "react-bootstrap";

import { GoogleLogin } from 'react-google-login';

export class Login extends Component{
    render(){
      // To show a mini-window of google sign-in page
      const responseGoogle = (response) => {
        console.log(response);
      }
        // Temporary placeholder
        const Login = () =>{

            const [email, setEmail] = useState("");
          
            const [password, setPassword] = useState("");
          
            // Validate if there is no empty values in the input.
            function validateForm() {
          
              return email.length > 0 && password.length > 0;
          
            }
          
            // If errors occurs, it will inform the account holders
            function handleSubmit(event) {
          
              event.preventDefault();
          
            }
          
            return (
          <div>
              <div className="Login">
                
                <Form onSubmit={handleSubmit}>
                <Container className="ContainerS">
                    <br/>
                <h1>Welcome Back!</h1>
                <hr/>
                {/* Google sign-in button */}
                <GoogleLogin
                  clientId="Test.apps.googleusercontent.com"
                  buttonText="Continue With Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
                  cookiePolicy={'single_host_origin'}
                />
                {/* Facebook Login button */}
                <div className="fb-login-button" style={{paddingTop:"2%"}} data-width="300" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="false"></div>
                <hr/>

                {/* Have account holders to fill in details in order to login to their account */}
                  <Form.Group size="lg" controlId="email" className="bar">
          
                    <Form.Label>Email</Form.Label>
          
                    <Form.Control
          
                      autoFocus
          
                      type="email"
          
                      value={email}
          
                      onChange={(e) => setEmail(e.target.value)}
          
                    />
          
                  </Form.Group>
                  <br/>
                  <Form.Group size="lg" controlId="password"  className="bar">
          
                    <Form.Label>Password</Form.Label>
          
                    <Form.Control
          
                      type="password"
          
                      value={password}
          
                      onChange={(e) => setPassword(e.target.value)}
          
                    />
          
                  </Form.Group>
                  <a style={{marginLeft:"45%"}} href="/Modules/AddListing/ForgotPassword">Lost Your Password?</a>
                    <br/>
                  <Button block size="sm" type="submit" disabled={!validateForm()} data-bs-toggle="modal" className="ButtonS" data-bs-target="#sucessModal">
                    Login
                  </Button>
                  <br/><br/>
                  </Container>
                  <br/>
                  <div className="Divline">
                 <p className="line"><span>Don't have an account?</span></p>
                  <br/>
                  <a href="/Modules/AddListing/Signup" className="click">Create Account</a>
                  </div>
                </Form>

                
                
                 {/* A message to inform account holder that login is successful and send them to the profile page. */}
                    <div className="modal fade " id="sucessModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title w-100" >Success!</h5>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3 ">
                                    
                                    <div className="p-2 w-100 bd-highlight">
                                    <label>Enjoy your stay!</label>
                                    <br/><br/>
                                    <NavLink className="d-inline fontstyle" to="/Modules/Profile/Profile">
                                        <button type="button" data-bs-dismiss="modal"
                                        className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                        >OK</button>
                                    </NavLink>
                                </div>

                                </div>
                                </div> 
                            </div>
                        </div>
                        </div>
              </div>
            </div>
            );
          
          }
        return(
            <Login/>
        )
        
    }
    
}