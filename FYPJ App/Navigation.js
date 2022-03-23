import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Container,Offcanvas} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="light" expand={false} sticky='top'>
                <Container fluid>
                    <Navbar.Toggle aria-controls="offcanvasNavbar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </Navbar.Toggle>
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start">
                        <Offcanvas.Header closeButton style={{backgroundColor:"#f6f4f5"}}>
                            <Offcanvas.Title id="offcanvasNavbarLabel">REFRAMED</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="bg-light">
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavLink className="d-inline p-2 bg-light text-black" to="">
                                    Home
                                </NavLink>
                                <NavLink className="d-inline p-2 bg-light text-black" to="/Pages/AboutUs">
                                    About Us
                                </NavLink>
                                </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        )
    }
}