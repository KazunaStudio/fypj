import React,{Component, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Offcanvas,Container, Dropdown, DropdownButton} from 'react-bootstrap';
import './App.css';
import {variables} from './Modules/CheckOut/Variables.js';

export class Navigation extends Component{
  // Do not touch this section A unless you have a enhanced cart database
    constructor(props){
      super(props);
      this.state={
          Cart:[],
          CartId:0,
          BuyerId:"",
          Buyername:"",
          SellerName:"",
          PId:"",
          PName:"",
          PAmt:"",
          PImg:"",
          PhotoPath:variables.IMG_URL,
  }
  }
  refreshList(){
  fetch(variables.API_URL+'Cart')
  .then(response=>response.json())
  .then(data=>{
      this.setState({Cart:data});
  });
  }

  componentDidMount(){
  this.refreshList();
  }
    render(){
      const {Cart} = this.state;
        const Menu = () =>{
            const [expand, setExpand] = useState(false);
            return (
                <Navbar className="color-nav" expanded={expand} expand={false} sticky='top' collapseOnSelect>
                    <Container>
            <Navbar.Toggle aria-controls="offcanvasNavbar" style={{border:"none"}} onClick={() => setExpand(expand ? false : "expanded")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </Navbar.Toggle>
{/* End of section A*/}

            <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start">
                  {/* This is where the username should be displayed */}
                <Offcanvas.Header closeButton style={{backgroundColor:"rgb(241, 241, 241)"}} onClick={() => setExpand(false)}>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontSize:"25px"}}>@James</Offcanvas.Title>
                </Offcanvas.Header>
                {/* Navigation to bring us to other modules when click on.*/}
                <Offcanvas.Body style={{backgroundColor:"rgb(241, 241, 241)"}}>
          <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Home" onClick={() => setExpand(false)}>
                  Home
                </NavLink>
                <NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/AboutUs" onClick={() => setExpand(false)}>
                  About Us
                </NavLink>
                <NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Charity" onClick={() => setExpand(false)}>
                  Charity
                </NavLink>
                <NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Listings/Listing" onClick={() => setExpand(false)}>
                  Listing
                </NavLink>
                <NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/FAQ" onClick={() => setExpand(false)}>
                  Enquiry
                </NavLink>
                {/* This section B is where the admin are able to edit the company's information,FAQ, Banners ,store locations and listing options */}
                <DropdownButton id="dropdown-basic-button" title="For project purpose ONLY" variant='light'>
                  <ul className='a'>
                      <li><NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Edit/EditBanner" onClick={() => setExpand(false)}>
                        Edit Banner
                      </NavLink></li>
                      <li><NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Edit/Employee" onClick={() => setExpand(false)}>
                        Edit Employee
                      </NavLink></li>
                      <li> <NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Edit/CompanyInfo" onClick={() => setExpand(false)}>
                        Edit Company Info
                      </NavLink></li>
                      <li><NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Edit/EditStore" onClick={() => setExpand(false)}>
                        Edit Participating Store
                      </NavLink></li>
                      <li><NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Edit/EditFaq" onClick={() => setExpand(false)}>
                        Edit FAQ
                      </NavLink></li>
                      <li><NavLink className="d-inline p-2 actives fontstyle" reloadDocument to="/Modules/Edit/EditOptions" onClick={() => setExpand(false)}>
                        Edit Listing Options
                      </NavLink></li>
                    </ul>
                </DropdownButton>
          </Nav>
          </Offcanvas.Body>
          {/* end of section B */}
          </Navbar.Offcanvas>
          <div>
            {/* Do not touch this section C */}
            <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/AddListing/Login">
                <button className='Logins'>
                Login/Signup
                </button> 
                </NavLink>
                {/* Display Total Item, if empty cart, it will show a shopping bad icon*/}
                {/* Editing this section is not recommended */}
                {Cart.length===0?
                <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/CheckOut/Cart">
                <button className='cart'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag center" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                </button> 
                </NavLink>:null}
                
                {Cart.length!==0?
                <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/CheckOut/Cart">
                <button className='cart'>
                {Cart.length}
                </button> 
                </NavLink>
                :null}
                <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/Profile/Profile">
              <button className='cart'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg></button>
              </NavLink>
              {/* end of section C*/}
          </div>
          </Container>
          </Navbar>
            )
        }
        // const HandleClose = () => setExpand(true)
        return(            
        <Menu/>      
        )
    }
}
