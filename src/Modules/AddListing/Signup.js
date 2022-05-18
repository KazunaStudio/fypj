import React, { useState,Component } from "react";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import "./Signup.css";
import {variables} from './Variables.js';
import swal from 'sweetalert';

export class Signup extends Component{
  constructor(props){
    super(props);

    this.state={
        Profile:[],
        UserId:0,
        Username:"",
        Useremail:"",
        Userbio:"",
        PassWrd:"User123",
        TotalProd:"",
        TotalCredit:"",
        UserImg:"empty.png",
        PhotoPath:variables.IMG_URL,
    }
}

refreshList(){
    fetch(variables.API_URL+'Profile')
    .then(response=>response.json())
    .then(data=>{
        this.setState({Profile:data});
    });
}

componentDidMount(){
    this.refreshList();
}

changeUseremail = (e)=>{
  this.setState({Useremail:e.target.value});
}
// addClick(){
//   this.setState({
//       UserId:0,
//       Username:" ",
//       Useremail:"",
//       Userbio:" ",
//       PassWrd:"",
//       TotalProd:" ",
//       TotalCredit:" ",
//       UserImg:"empty.png",
//   });
// }
// createClick(){
//   fetch(variables.API_URL+'Profile',{
//       method:'POST',headers:{
//           'Accept':'application/json',
//           'Content-Type':'application/json'
//       },
//   body:JSON.stringify({            
//       UserName:this.state.UserName,
//       Useremail:this.state.Useremail,
//       Userbio:this.state.Userbio,
//       PassWrd:this.state.PassWrd,
//       TotalProd:this.state.TotalProd,
//       TotalCredit:this.state.TotalCredit,
//       UserImg:this.state.UserImg,
//   })
// })
// .then(res=>res.json())
// .then((result)=>{
//   swal('Congrats!',result,'success');
//   this.refreshList();
// },(error)=>{
//   swal('Oops!','Failed','error');
// })
// }
    render(){
      const {Profile,Useremail,UserId}=this.state;
      const responseGoogle = (response) => {
        console.log(response);
      }
        const Signup = () =>{
          
            const [password, setPassword] = useState("");

            const [CFMpassword, setCFMPassword] = useState("");

            const [confirmationCode, setconfirmationCode] = useState("");
            
              function validateForm() {
                return (
                  password.length > 0 &&
                  password === CFMpassword
                );
              }
            
              function validateConfirmationForm() {
                return confirmationCode.length > 0 &&
                confirmationCode.length < 7;
              }
            
              async function handleSubmit(event) {
                event.preventDefault();
            
              }       
              async function handleConfirmationSubmit(event) {
                event.preventDefault();
              }

        return (
            <div>
                <div className="Signup">
                  <Form onSubmit={handleSubmit}>
                  <Container className="ContainerS">
                      <br/>
                      <h1>Create New Account</h1>
                    <hr/>
                <GoogleLogin
                  clientId="Test.apps.googleusercontent.com"
                  buttonText="Login With Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
                  cookiePolicy={'single_host_origin'}
                />
                <div className="fb-login-button" style={{paddingTop:"2%"}} data-width="200" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="false"></div>
                <hr/>
                    <Form.Group size="lg" controlId="email" className="bar">
          
                    <Form.Label>Email</Form.Label>
          
                    <Form.Control  
                      autoFocus
          
                      type="email"
          
                      value={Useremail}
          
                      onChange={this.changeUseremail}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                          
                  </Form.Group>
                    <br/>
                    <Form.Group controlId="password" size="lg" className="bar">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="confirmPassword" size="lg" className="bar">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={CFMpassword}
                        onChange={(e) => setCFMPassword(e.target.value)}
                      />
                    </Form.Group>

                    <br/>
                    <button block size="sm" className="ButtonS"  
                    data-bs-toggle="modal" data-bs-target="#codeModal"
                      type="submit" 
                      // onClick={()=>this.createClick()}
                      // onClick={()=>this.addClick()}
                      disabled={!validateForm()}> 
                      Signup
                    </button>
                    <br/><br/>
                    </Container>
                    <br/>
                  <div className="Divline">
                 <p className="line"><span>Have an account?</span></p>
                  <br/>
                  <a href="/Modules/AddListing/Login" className="click">Login</a>
                  </div>
                  </Form>

                  <div className="modal fade " id="codeModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title w-100" >Wait!</h5>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3 ">
                                    
                                    <div className="p-2 w-100 bd-highlight">
                                        <label>Confirmation Code</label>
                                        <input type="text" className="form-control" onChange={(e) => setconfirmationCode(e.target.value)} placeholder={"Enter 6 digit number"}/>
                                        <br/>
                                        {UserId===0?
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#sucessModal"
                                        // onClick={()=>this.createClick()} 
                                        className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}} disabled={!validateConfirmationForm()}
                                        >Verify</button>:null}
                                </div>

                                </div>
                                </div> 
                            </div>
                        </div>
                        </div>

                  <div className="modal fade " id="sucessModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title w-100" >Completed!</h5>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3 ">
                                    
                                    <div className="p-2 w-100 bd-highlight">
                                    <label>Proceed to create profile.</label>
                                    <br/><br/>
                                    <NavLink className="d-inline fontstyle" to="/Modules/Profile/AddProfile">
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
            <Signup/>
        )
        
    }
    
}