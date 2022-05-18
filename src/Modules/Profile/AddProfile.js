import React,{Component} from 'react';
import "./Profile.css";
import {variables} from './Variables.js';
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import {NavLink} from 'react-router-dom';

import { Container } from "react-bootstrap";

import Profile_Guy from "../Profile/Image/male.jpg";

export class EditProfile extends Component{
    
    handleSubmit(event) {
        event.preventDefault();
    }

    render(){ 
                return (
              <div>
                  <div>
                    
                    <Form onSubmit={this.handleSubmit}>
                    <Container>
                        <br/>
                    <h1>Create Profile</h1>
                      <Form.Group size="lg" controlId="username" className="bar">
              
                      <Form.Label>Your Username</Form.Label>
              
                        <Form.Control
                
                            autoFocus
                
                            type="text"
                
                            value={"Username"}
                
                        />
                        </Form.Group>
                        <br/>
                        <Form.Group size="lg" controlId="email" className="bar">
          
                    <Form.Label>Your Email</Form.Label>
          
                    <Form.Control
          
                      autoFocus
          
                      type="email"
          
                      value={"James@mail.com"}
          
                      disabled={true}
          
                    />
                  </Form.Group>
                  <br/>
                  <Form.Group size="lg" controlId="Userbio" className="bar">
              
                      <Form.Label>Your Bio</Form.Label>
              
                        <Form.Control
                
                            autoFocus
                
                            type="text"       
                
                        />
                        </Form.Group>
                        <br/>
                  <div>
                    <img width="250px" height="250px" style={{borderRadius:"50%"}} src={Profile_Guy} alt=""/>
                    <br/>
                    <input className="m-2" type="file"/>
                            </div>
                      <br/>
                      <Button block size="sm" type="submit" 
                      data-bs-toggle="modal" className="ButtonS" data-bs-target="#sucessModal">
                        Save
                      </Button>
                      <br/><br/>
                      </Container>
                    </Form>
    
                    
                    
                    
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

        }