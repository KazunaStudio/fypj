import React, {Component, useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import {NavLink} from 'react-router-dom';

import "./Login.css";
import { Container } from "react-bootstrap";

export class ForgotPassword extends Component{
    render(){
      // Temporary placeholder
        const ForgotPassword = () =>{

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
              <div className="ForgotPassword">
                {/* Have account holders to fill in details in order to recover their account */}
                <Form onSubmit={handleSubmit}>
                <Container className="ContainerS">
                    <br/>
                <h1>Forgot Password?</h1>
                <hr/>
                  <Form.Group size="lg" controlId="email" className="bar">
          
                    <Form.Label>Email</Form.Label>
          
                    <Form.Control
          
                      autoFocus
          
                      type="email"
          
                      value={email}
          
                      onChange={(e) => setEmail(e.target.value)}
          
                    />
          
                  </Form.Group>
          
                  <Form.Group size="lg" controlId="password"  className="bar">
          
                    <Form.Label>Password</Form.Label>
          
                    <Form.Control
          
                      type="password"
          
                      value={password}
          
                      onChange={(e) => setPassword(e.target.value)}
          
                    />
                    </Form.Group>

                    <Form.Group size="lg" controlId="password"  className="bar">
                            
                            <Form.Label>Re-enter Password</Form.Label>

                            <Form.Control

                                type="password"

                                value={password}

                                onChange={(e) => setPassword(e.target.value)}

                            />
          
                  </Form.Group>
                    <br/>
                  <Button block size="sm" type="submit" disabled={!validateForm()} data-bs-toggle="modal" className="ButtonS"
                                                data-bs-target="#sucessModal">
          
                    Submit
                  </Button>
                  <br/><br/>
                  </Container>
                </Form>

                
                
                {/* A message to inform account holder that an email has been sent. */}
                    <div className="modal fade " id="sucessModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title w-100" >Successful</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3 ">
                                    
                                    <div className="p-2 w-100 bd-highlight">
                                    <label>An email has been sent to your inbox.</label>
                                    <br/><br/>
                                    <NavLink className="d-inline fontstyle" to="/Modules/AddListing/Login">
                                        <button type="button" data-bs-dismiss="modal"
                                        className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                        >Back To Login</button>
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
            <ForgotPassword/>
        )
        
    }
    
}