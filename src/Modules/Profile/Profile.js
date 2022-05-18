import React,{Component, useState} from 'react';
import "./Profile.css";
import {variables} from './Variables.js';
import Button from "react-bootstrap/Button";
import { Collapse, Container } from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import Profile_Guy from "../Profile/Image/male.jpg";
import swal from 'sweetalert';

export class Profile extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            Colour:[],
            Shape:[],
            Type:[],
            Material:[],
            Auction:[],
            AuctionId:0,
            AuctionName:"",
            UserName:"",
            AuctionDes:"",
            AuctionType:"",
            AuctionShape:"",
            AuctionMaterial:"",
            AuctionColour:"",
            AuctionStartDatetime: "",
            AuctionEndDatetime:"",
            AuctionStartAmt:"",
            AuctionEndAmt:"",
            AuctionImg:"empty.png",
            PhotoPath:variables.IMG_URL,

            Product:[],
            ProductId:0,
            ProductName:"",
            UserName:"",
            ProductDes:"",
            ProductType:"",
            ProductShape:"",
            ProductMaterial:"",
            ProductColour:"",
            ProductAmt:"",
            ProductImg:"empty.png",  
        }
    }

    refreshList(){
        fetch(variables.API_URL+'AuctionList')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Auction:data, ItemWithoutFilter:data});
        });
        fetch(variables.API_URL+'Colour')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Colour:data});
        });

        fetch(variables.API_URL+'Shape')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Shape:data});
        });

        fetch(variables.API_URL+'Type')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Type:data});
        });

        fetch(variables.API_URL+'Material')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Material:data});
        });

        fetch(variables.API_URL+'Cart')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Cart:data});
        });
        fetch(variables.API_URL+'ProductList')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Product:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeProductName = (e)=>{
        this.setState({ProductName:e.target.value});
    }

    changeProductDes = (e)=>{
        this.setState({ProductDes:e.target.value});
    }

    changeProductType= (e)=>{
        this.setState({ProductType:e.target.value});
    }

    changeProductShape= (e)=>{
        this.setState({ProductShape:e.target.value});
    }
    changeProductMaterial= (e)=>{
        this.setState({ProductMaterial:e.target.value});
    }
    changeProductColour= (e)=>{
        this.setState({ProductColour:e.target.value});
    }
    
    changeProductAmt= (e)=>{
        this.setState({ProductAmt:e.target.value});
    }

    changeAuctionName = (e)=>{
        this.setState({AuctionName:e.target.value});
    }

    changeAuctionDes = (e)=>{
        this.setState({AuctionDes:e.target.value});
    }

    changeAuctionType= (e)=>{
        this.setState({AuctionType:e.target.value});
    }

    changeAuctionShape= (e)=>{
        this.setState({AuctionShape:e.target.value});
    }
    changeAuctionMaterial= (e)=>{
        this.setState({AuctionMaterial:e.target.value});
    }
    changeAuctionColour= (e)=>{
        this.setState({AuctionColour:e.target.value});
    }
    changeEndDatetime= (e)=>{
        this.setState({AuctionEndDatetime:e.target.value});
    } 
    
    changeAuctionStartAmt= (e)=>{
        this.setState({AuctionStartAmt:e.target.value});
        this.setState({AuctionEndAmt:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Product Listing",
            ProductId:0,
            ProductName:"",
            UserName:"James",
            ProductDes:"",
            ProductType:"",
            ProductShape:"",
            ProductMaterial:"",
            ProductColour:"",
            ProductAmt:"",
            ProductImg:"empty.png",
        });
    }

    createClick(){
        fetch(variables.API_URL+'ProductList',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({            
            ProductName:this.state.ProductName,
            UserName:this.state.UserName,
            ProductDes:this.state.ProductDes,
            ProductType:this.state.ProductType,
            ProductShape:this.state.ProductShape,
            ProductMaterial:this.state.ProductMaterial,
            ProductColour:this.state.ProductColour,
            ProductEndAmt:this.state.ProductAmt,
            ProductImg:this.state.ProductImg
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        swal('Congrats!',result,'success');
        this.refreshList();
    },(error)=>{
        swal('Oops!','Failed','error');
    })
    }

    addAClick(){
        this.setState({
            modalTitle:"Add Auction Listing",
            AuctionId:0,
            AuctionName:"",
            UserName:"James",
            AuctionDes:"",
            AuctionType:"",
            AuctionShape:"",
            AuctionMaterial:"",
            AuctionColour:"",
            AuctionStartDatetime:"",
            AuctionEndDatetime:"",
            AuctionStartAmt:"",
            AuctionEndAmt:"",
            AuctionImg:"empty.png",
        });
    }
    createAClick(){
        fetch(variables.API_URL+'AuctionList',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({            
            AuctionName:this.state.AuctionName,
            UserName:this.state.UserName,
            AuctionDes:this.state.AuctionDes,
            AuctionType:this.state.AuctionType,
            AuctionShape:this.state.AuctionShape,
            AuctionMaterial:this.state.AuctionMaterial,
            AuctionColour:this.state.AuctionColour,
            AuctionStartDatetime:this.state.AuctionStartDatetime,
            AuctionEndDatetime:this.state.AuctionEndDatetime,
            AuctionStartAmt:this.state.AuctionStartAmt,
            AuctionEndAmt:this.state.AuctionEndAmt,
            AuctionImg:this.state.AuctionImg
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        swal('Congrats!',result,'success');
        this.refreshList();
    },(error)=>{
        swal('Oops!','Failed','error');
    })
    }


    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'ProductList/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({ProductImg:data});
        })
    }

    AimageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'AuctionList/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({AuctionImg:data});
        })
    }

    render(){ 
        const today = new Date().toISOString().slice(0, -8);
        const {
            // Profile
            modalTitle,Colour,Shape,Type,Material,ProductName,ProductDes,ProductType,ProductShape,ProductMaterial,ProductColour,ProductAmt,PhotoPath,ProductImg
            ,AuctionName,AuctionDes,AuctionType,AuctionShape,AuctionMaterial,AuctionColour,AuctionStartAmt,AuctionEndDatetime,AuctionImg
        }=this.state;
                    //End of section A
            return(
                <div>
                    <Container className='ContainerP'>
                    <table className='collapsetable'>
                        <tr>
                            <Container className='Profiledisplay'>
                                <br/>
                            <td className='displayitem'><img width="250px" height="250px" style={{borderRadius:"50%"}} src={Profile_Guy} alt=""/></td>
                            <td style={{textAlign:"left"}} className='displayitem'>
                                @James
                                <br/>
                                James@mail.com
                                <br/>
                            </td>
                            <br/><br/>
                            </Container>
                        </tr>
                    </table>
                    <br/>
                    <table className='collapsetable'>
                        <tr>
                            <th className="totalDisplay"><h4>Total Products <br/> 20</h4></th>
                            <th className="totalDisplay"><h4>Total Credit <br/> 10</h4></th>
                        </tr>
                    </table>
                    </Container>
                    <br/>
                    <Container style={{textAlign:"left"}} className='ContainerP WhiteBG'>
                        <br/>
                        <h5 data-bs-toggle="modal" className="buttonA" data-bs-target="#listingModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list-ol roundButton" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                        <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
                        </svg> My Listings
                        </h5>
                        <h5 data-bs-toggle="modal" className="buttonA" data-bs-target="#createModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus roundButton" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg> Create List</h5>
                        <h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person roundButton" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg> Personal Information</h5>
                        <h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-lock roundButton" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                        </svg> Change Password</h5>
                        <br/>
                    </Container>
                
                <div className="modal fade " id="listingModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                            <div className="modal-dialog modal-sm modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title w-100" >My Listings</h5>
                                    </div>
    
                                    <div className="modal-body">
                                        <div className="d-flex flex-row bd-highlight mb-3 ">
                                        
                                        <div className="p-2 w-100 bd-highlight">
                                        <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/AddListing/AddAuction">
                                            <button type="button" data-bs-dismiss="modal"
                                            className="btn buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                            >Auctions</button>
                                        </NavLink>
                                        </div>
                                        <div className="p-2 w-100 bd-highlight">
                                        <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/AddListing/AddProduct">
                                            <button type="button" data-bs-dismiss="modal"
                                            className="btn buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue",marginRight:"5%"}}
                                            >Products</button>
                                        </NavLink>
                                    </div>
    
                                    </div>
                                    </div> 
                                </div>
                            </div>
                            </div>

                            <div className="modal fade " id="createModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                            <div className="modal-dialog modal-sm modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title w-100" >Create List</h5>
                                    </div>
    
                                    <div className="modal-body">
                                        <div className="d-flex flex-row bd-highlight mb-3 ">
                                        
                                        <div className="p-2 w-100 bd-highlight">
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#AuctionModal" onClick={()=>this.addAClick()}
                                            className="btn roundButton buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg> Auction</button>
                                        </div>
                                        <div className="p-2 w-100 bd-highlight">
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#ProductModal" onClick={()=>this.addClick()}
                                            className="btn roundButton buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue",marginRight:"5%"}}
                                            > 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg> Product</button>
                                            
                                        </div>
    
                                    </div>
                                    </div> 
                                </div>
                            </div>
                            </div>
                            
                <div className="modal fade" id="ProductModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 w-100 bd-highlight">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Type</span>
                                    <select className="form-select"
                                    onChange={this.changeProductType}
                                    value={ProductType}>
                                        <option>Select Type</option>
                                        {Type.map(Type=><option key={Type.TypeId}>
                                            {Type.TypeName}
                                        </option>)}
                                    </select>
                                    </div>
                                    <div className="input-group mb-3">
                                    <span className="input-group-text">Shape</span>
                                    <select className="form-select"
                                    onChange={this.changeProductShape}
                                    value={ProductShape}>
                                        <option>Select Shape</option>
                                        {Shape.map(Shape=><option key={Shape.ShapeId}>
                                            {Shape.ShapeName}
                                        </option>)}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" >Material</span>
                                    <select className="form-select"
                                    onChange={this.changeProductMaterial}
                                    value={ProductMaterial}>
                                        <option>Select Material</option>
                                        {Material.map(Material=><option key={Material.MaterialId}>
                                            {Material.MaterialName}
                                        </option>)}
                                    </select>
                                            </div>
                                            <div className="input-group mb-3">
                                    <span className="input-group-text">Colour</span>
                                    <select className="form-select"
                                    onChange={this.changeProductColour}
                                    value={ProductColour}>
                                        <option>Select Colour</option>
                                        {Colour.map(Colour=><option key={Colour.ColourId}>
                                            {Colour.ColourName}
                                        </option>)}
                                    </select>
                                </div>
                                <button type="button" 
                                        className="btn mr-1 float-end buttonColour" data-bs-toggle="modal"
                                        data-bs-target="#NextModal">Next</button>
                        
                 </div>
                 </div>
                    </div>
                    </div>
                    </div>
                    </div>

                    <div className="modal fade" id="NextModal" tabIndex="-1" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 w-100 bd-highlight">
                            <div className="input-group mb-3">
                                    <span className="input-group-text">Product Name</span>
                                    <input type="text" className="form-control"
                                    onChange={this.changeProductName} value={ProductName}/>
                                </div>
    
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Price</span>
                                        <input type="number" className="form-control"
                                        value={ProductAmt} min="5"
                                        onChange={this.changeProductAmt}/>
                                    </div>
    
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Description</span>
                                        <textarea type="text" className="form-control"
                                        value={ProductDes}
                                        onChange={this.changeProductDes}/>
                                    </div>
    
                                    <div>
                                    <img width="250px" height="250px" src={PhotoPath+ProductImg} alt=""/>
                                    <input className="m-2" type="file" onChange={this.imageUpload}/>
                                </div>
                                    
                                    <button type="button" data-bs-dismiss="modal"
                                    className="btn btn-primary float-start buttonColour"
                                    onClick={()=>this.createClick()}
                                    >Create</button>
                                </div> 
                        </div>
                    </div>    
                    </div>
                    </div>
                    </div>

                    <div className="modal fade" id="AuctionModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 w-100 bd-highlight">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Type</span>
                                    <select className="form-select"
                                    onChange={this.changeAuctionType}
                                    value={AuctionType}>
                                        <option>Select Type</option>
                                        {Type.map(Type=><option key={Type.TypeId}>
                                            {Type.TypeName}
                                        </option>)}
                                    </select>
                                    </div>
                                    <div className="input-group mb-3">
                                    <span className="input-group-text">Shape</span>
                                    <select className="form-select"
                                    onChange={this.changeAuctionShape}
                                    value={AuctionShape}>
                                        <option>Select Shape</option>
                                        {Shape.map(Shape=><option key={Shape.ShapeId}>
                                            {Shape.ShapeName}
                                        </option>)}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" >Material</span>
                                    <select className="form-select"
                                    onChange={this.changeAuctionMaterial}
                                    value={AuctionMaterial}>
                                        <option>Select Material</option>
                                        {Material.map(Material=><option key={Material.MaterialId}>
                                            {Material.MaterialName}
                                        </option>)}
                                    </select>
                                            </div>
                                            <div className="input-group mb-3">
                                    <span className="input-group-text">Colour</span>
                                    <select className="form-select"
                                    onChange={this.changeAuctionColour}
                                    value={AuctionColour}>
                                        <option>Select Colour</option>
                                        {Colour.map(Colour=><option key={Colour.ColourId}>
                                            {Colour.ColourName}
                                        </option>)}
                                    </select>
                                </div>
                                <button type="button" 
                                        className="btn mr-1 float-end buttonColour" data-bs-toggle="modal"
                                        data-bs-target="#NextAModal">Next</button>
                        
                 </div>
                 </div>
                    </div>
                    </div>
                    </div>
                    </div>

                    <div className="modal fade" id="NextAModal" tabIndex="-1" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 w-100 bd-highlight">
                            <div className="input-group mb-3">
                                    <span className="input-group-text">Product Name</span>
                                    <input type="text" className="form-control"
                                    onChange={this.changeAuctionName} value={AuctionName}/>
                                </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">End Date & Time</span>
                                        <input type="datetime-local" step="1"  min={today} className="form-control" 
                                        value={AuctionEndDatetime}
                                        onChange={this.changeEndDatetime}/>
                                    </div>
                            
    
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Starting Price</span>
                                        <input type="number" className="form-control"
                                        value={AuctionStartAmt} min="5"
                                        onChange={this.changeAuctionStartAmt}/>
                                    </div>
    
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Description</span>
                                        <textarea type="text" className="form-control"
                                        value={AuctionDes}
                                        onChange={this.changeAuctionDes}/>
                                    </div>
    
                                    <div>
                                    <img width="250px" height="250px" src={PhotoPath+AuctionImg} alt=""/>
                                    <input className="m-2" type="file" onChange={this.AimageUpload}/>
                                </div>
                                    
                                    <button type="button" data-bs-dismiss="modal"
                                    className="btn btn-primary float-start buttonColour"
                                    onClick={()=>this.createAClick()}
                                    >Create</button>
                                </div> 
                        </div>
                    </div>    
                    </div>
                    </div>
                    </div>
                </div>
            )
        }
        
    }