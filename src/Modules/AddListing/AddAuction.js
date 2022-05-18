import React,{Component,useState} from 'react';
import {variables} from './Variables.js';
import "./Table.css";
import dateFormat from 'dateformat';
import swal from 'sweetalert';
import Countdown from 'react-countdown';

export class AddAuction extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            Auction:[],
            Colour:[],
            Shape:[],
            Type:[],
            Material:[],
            modalTitle:"",
            AuctionId:0,
            AuctionName:"",
            UserName:"James",
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
        }
    }

    refreshList(){
        fetch(variables.API_URL+'AuctionList')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Auction:data});
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
    }

    componentDidMount(){
        this.refreshList();
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

    //This is to add values into the variables for storing later
    addClick(){
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

      //This is to edit values into the variables for storing later
    editClick(A){
        this.setState({
            modalTitle:"Edit Auction Listing",
            AuctionId:A.AuctionId,
            AuctionName:A.AuctionName,
            AuctionDes:A.AuctionDes,
            AuctionType:A.AuctionType,
            AuctionShape:A.AuctionShape,
            AuctionMaterial:A.AuctionMaterial,
            AuctionColour:A.AuctionColour,
            AuctionStartDatetime:A.AuctionStartDatetime,
            AuctionEndDatetime:A.AuctionEndDatetime,
            AuctionStartAmt:A.AuctionStartAmt,
            AuctionEndAmt:A.AuctionEndAmt,
            AuctionImg:A.AuctionImg
        });
    }

    //Save the variable into the database by calling the Web Api to call for the procedure to store data
    createClick(){
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

    //Save the edited variable into the database by calling the Web Api to call for the procedure to store data
    updateClick(){
        fetch(variables.API_URL+'AuctionList',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            AuctionId:this.state.AuctionId,
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

    //To delete a data row
    deleteClick(id){
        swal({
            title: "Wait!",
            text:"Are you sure you want to delete this listing?",
            icon:"warning",
            dangerMode:true,
        })
        .then(willDelete =>{
            if (willDelete){
                fetch(variables.API_URL+'AuctionList/'+id,{
                    method:'DELETE',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then((result)=>{
                    swal('Congrats!',result,'success');
                    this.refreshList();
                },(error)=>{
                    swal('Oops!','Failed','error');
                })
                }
        });  
    }

    //Upload the img file to the image folder in Web Api and save the file name into the database.
    imageUpload=(e)=>{
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
        // This constant is to prevent Sellers to assign a date before today.
        const today = new Date().toISOString().slice(0, -8)
        const {
            Auction,modalTitle,Colour,Shape,Type,Material,AuctionId,AuctionName,AuctionDes,AuctionType,AuctionShape,AuctionMaterial,AuctionColour,AuctionStartAmt,AuctionEndAmt,AuctionStartDatetime,AuctionEndDatetime,PhotoPath,AuctionImg}=this.state;
            // End of Section A
        return(
            <div>
                <br/>
                <h1 style={{color:"Black", captionSide:"top", alignContent:"start",textAlign:"left"}}><b style={{fontSize:"35px"}}>Your Auction Listing</b>
                </h1><h3 style={{color:"Black", captionSide:"top", alignContent:"start",textAlign:"left"}}>Total Listing: {Auction.length}{/* Total no. of listing */}
                {/* Start creating a Auction Listing */}
                <div type="button"
                className="btn m-2 float-end buttonColour roundButton"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    +
                </div></h3>
                
                <br/>
                <hr/> 
                <table className="collapsetable" >                                                                                    
                    <tbody>
                        {/* Section B requires research before editing can begin, recommend to test on another file before editing the countdown */}
                        {/* Countdown System */}
                        {Auction.map(A=>{
                            // Component for when the countdown is over
                            const Completionist = () => 
                            <span>
                                <td key={A.AuctionId} style={{textAlign:"center"}} className='displayitem'>
                                <div style={{borderRadius: "5%",background:"white"}}> 
                                <p className='AuctionEnd'>Winner: @Sally45</p>
                                <p colSpan={2}> <b>{dateFormat(A.AuctionStartDatetime, "mm/dd/yyyy h:MM TT")} - <br/>{dateFormat(A.AuctionEndDatetime, "mm/dd/yyyy h:MM TT")}</b>
                                 </p>
                                <p>
                                <img width="120px" height="120px" src={PhotoPath+A.AuctionImg} alt=""/></p>
                                <p><b>{A.AuctionName}</b><br/>
                                @{A.UserName}
                                    <br/>{A.AuctionDes}
                                    <br/><b>Type : </b>{A.AuctionType} | <b>Shape : </b>{A.AuctionShape}
                                    <br/><b>Colour : </b>{A.AuctionColour} | <b>Material  :</b>{A.AuctionMaterial}
                                    <br/>Original Price: ${A.AuctionStartAmt} <b>Current Bid:</b> ${A.AuctionEndAmt}
                                    {/* To delete a list item */}
                                    <button type="button" 
                                        className="btn mr-1 float-end"
                                        onClick={()=>this.deleteClick(A.AuctionId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                    </button>
                                </p>                            
                                </div> 
                                </td>
                            </span>;

                            // Renderer callback with condition
                            const renderer = ({ days, hours, minutes, seconds, completed }) => {
                            if (completed) {
                                // Render a completed state
                                return <Completionist />;
                            } else {
                                // Render a countdown
                                return <span> 
                                <td key={A.AuctionId} style={{textAlign:"center"}} className='displayitem'>
                                <div style={{borderRadius: "5%", boxSizing: "border-box",background:"white"}}> 
                                <p className='AuctionStart'>{days}D {hours}H {minutes}M {seconds}S</p> 
                                <p colSpan={2}> <b>{dateFormat(A.AuctionStartDatetime, "mm/dd/yyyy h:MM TT")} - <br/>{dateFormat(A.AuctionEndDatetime, "mm/dd/yyyy h:MM TT")}</b>
                                 </p>
                                <p>
                                <img width="120px" height="120px" src={PhotoPath+A.AuctionImg} alt=""/></p>
                                <p><b>{A.AuctionName}</b><br/>
                                @{A.UserName}
                                    <button type="button"
                                        className="btn mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.editClick(A)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                    </button>
                                    <br/>{A.AuctionDes}
                                    <br/><b>Type : </b>{A.AuctionType} | <b>Shape : </b>{A.AuctionShape}
                                    <br/><b>Colour : </b>{A.AuctionColour} | <b>Material  :</b>{A.AuctionMaterial}
                                    <br/>Original Price: ${A.AuctionStartAmt} <b>Current Bid:</b> ${A.AuctionEndAmt}
                                    <button type="button" 
                                        className="btn mr-1 float-end"
                                        onClick={()=>this.deleteClick(A.AuctionId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                    </button>
                                </p>                               
                                </div> 
                                </td>
                                </span>;
                                }
                            };
                        return(
                                <Countdown date={new Date(A.AuctionEndDatetime).getTime()} renderer={renderer}/>
                        )}
                        )}
                        {/* End of Section B */}
                    </tbody>
                </table>

                {/* Modal (popup) for inserting values/ editing values */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>
                            {/* Part 1 */}
                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                            {AuctionId===0?  
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
                                        data-bs-target="#NextModal">Next</button>
                        
                 </div>:null}
                        

                            {AuctionId!==0?
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

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Product Name</span>
                                    <input type="text" className="form-control"
                                    onChange={this.changeAuctionName} value={AuctionName}/>
                                </div>

                               
                                {AuctionId===0?                 
                                <div className="input-group mb-3">
                                    <span className="input-group-text">End Date & Time</span>
                                    <input type="datetime-local" step="1"  min={today} className="form-control" 
                                    value={AuctionEndDatetime}
                                    onChange={this.changeEndDatetime}/>
                                </div>:null}
                        
                                {AuctionId===0?                 
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Starting Price</span>
                                    <input type="number" className="form-control"
                                    value={AuctionStartAmt} min="5"
                                    onChange={this.changeAuctionStartAmt}/>
                                </div>:null}
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Description</span>
                                    <textarea type="text" className="form-control"
                                    value={AuctionDes}
                                    onChange={this.changeAuctionDes}/>
                                </div>

                                <div>
                                <img width="250px" height="250px" src={PhotoPath+AuctionImg} alt=""/>
                                <input className="m-2" type="file" onChange={this.imageUpload}/>
                            </div>
                                <button type="button" data-bs-dismiss="modal"
                                className="btn float-start buttonColour" 
                                onClick={()=>this.updateClick()}
                                >Update</button>
                        </div>:null}
                        
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    {/* Part 2 (Only when adding Values) */}
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
            </div>
                
        )  
    }   
}
