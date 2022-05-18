import React,{Component,useState} from 'react';
import {variables} from '../Variables.js';
import {NavLink} from 'react-router-dom';
import Countdown from 'react-countdown';
import "./Table.css";
import swal from 'sweetalert';

export class Auction extends Component{
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

            ItemNameFilter:"",
            ItemTypeFilter:"",
            ItemShapeFilter:"",
            ItemMaterialFilter:"",
            ItemColourFilter:"",
            ItemIdFilter:"",
            ItemWithoutFilter:[],

            Cart:[],
            CartId:0,
            BuyerId:"1",
            Buyername:"Sally45",
            SellerName:"",
            PId:"",
            PName:"",
            PAmt:"",
            PImg:"",
        }
    }

    //Filter to the desired items
    FilterFn(){
        var ItemIdFilter = this.state.ItemIdFilter;
        var ItemNameFilter = this.state.ItemNameFilter;
        var ItemTypeFilter = this.state.ItemTypeFilter;
        var ItemShapeFilter = this.state.ItemShapeFilter;
        var ItemMaterialFilter = this.state.ItemMaterialFilter;
        var ItemColourFilter = this.state.ItemColourFilter;
        var ItemIdfilteredData=this.state.ItemWithoutFilter.filter(
            function(el){
                return el.AuctionId.toString().toLowerCase().includes(ItemIdFilter.toString().trim().toLowerCase())
            &&
                el.AuctionName.toString().toLowerCase().includes(ItemNameFilter.toString().trim().toLowerCase())
            && 
                el.AuctionType.toString().toLowerCase().includes(ItemTypeFilter.toString().trim().toLowerCase())
            && 
                el.AuctionShape.toString().toLowerCase().includes(ItemShapeFilter.toString().trim().toLowerCase())
                && 
                el.AuctionMaterial.toString().toLowerCase().includes(ItemMaterialFilter.toString().trim().toLowerCase())
                && 
                el.AuctionColour.toString().toLowerCase().includes(ItemColourFilter.toString().trim().toLowerCase())
            });

        this.setState({Auction:ItemIdfilteredData});

    }
    
    changeItemIdFilter(e,id){
            this.state.ItemIdFilter = id;
            this.FilterFn();
        }

    changeItemNameFilter = (e)=>{
        this.state.ItemNameFilter = e.target.value;
        this.FilterFn();
    }
    changeTypefilter= (e)=>{
        this.state.ItemTypeFilter = e.target.value;
        this.FilterFn();
    }
    changeShapefilter= (e)=>{
        this.state.ItemShapeFilter = e.target.value;
        this.FilterFn();
    }
    changeMaterialfilter= (e)=>{
        this.state.ItemMaterialFilter = e.target.value;
        this.FilterFn();
    }
    changeColourfilter= (e)=>{
        this.state.ItemColourFilter = e.target.value;
        this.FilterFn();
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
    }

    componentDidMount(){
        this.refreshList();
    }

    // To insert new values to the empty variable
    editClick(A){
        this.setState({
            modalTitle:"Are You Sure?",
            AuctionId:A.AuctionId,
            AuctionName:A.AuctionName,
            UserName:A.UserName,
            AuctionDes:A.AuctionDes,
            AuctionType:A.AuctionType,
            AuctionShape:A.AuctionShape,
            AuctionMaterial:A.AuctionMaterial,
            AuctionColour:A.AuctionColour,
            AuctionStartDatetime:A.AuctionStartDatetime,
            AuctionEndDatetime:A.AuctionEndDatetime,
            AuctionStartAmt:A.AuctionStartAmt,
            AuctionEndAmt:(A.AuctionEndAmt + 5),
            AuctionImg:A.AuctionImg
        });
          
    }

    // Save the variable (in this case, we are saving the new value for amount however due to the nature of the function in VS C#, we are required
    // to have all the variable name.)
    bid(){
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
            swal('Congrats!','You have bid for this item!','success');
            this.refreshList();
        },(error)=>{
            swal('Oops!','Failed','error');
        });
    }

    // To add variable
    Claim(A){
        this.setState({
            BuyerId:"1",
            Buyername:"Sally45",
            SellerName:A.UserName,
            PId:A.AuctionId,
            PName:A.AuctionName,
            PAmt:A.AuctionEndAmt,
            PImg:A.AuctionImg
        });
    }

    // To save the variables into the cart
    CfmClaim(){
        fetch(variables.API_URL+'Cart',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            BuyerId:this.state.BuyerId,
            Buyername:this.state.Buyername,
            SellerName:this.state.SellerName,
            PId:this.state.PId,
            PName:this.state.PName,
            PAmt:this.state.PAmt,
            PImg:this.state.PImg,
            })            
        })
        .then(res=>res.json())
        .then((result)=>{
            this.refreshList();
        },(error)=>{
            swal('Oops!','Failed','error');
        });
    }

    
    render(){
         const {
            Auction,PhotoPath,modalTitle,AuctionId,Colour,Shape,Type,Material}=this.state;
            // End of Section A
        
            //A like function where netizen like a item, the heart will be filled. Default setting is a heart filled.
        function Like(){
            const [Heart, setHeart] = useState(true);
            return(
                <span>
                    {Heart === false ? (
                        <div type="button" className="btn mr-1" onClick={() => setHeart(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg></div>
                            ) : (
                                <div type="button" className="btn mr-1" onClick={() => setHeart(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                                </div>
                    )}
                    </span>  
            )
        }

        // For the placeholder.
        const popup = () =>{
            swal('Want to try on?','Comming Soon')
        }

        
       
        return(
            <div>
                <br/><NavLink className="d-inline fontstyle" reloadDocument to="/Modules/Listings/Auction">
                <h1 style={{color:"Black", captionSide:"top", alignContent:"start"}}>Listings 
                </h1>
                </NavLink>

                <p>
                    <input className="Bar" style={{width:"50%"}} onChange={this.changeItemNameFilter} placeholder="Search Name"/>
                    <button type="button"  className="btn " data-bs-toggle="modal" data-bs-target="#FilterModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-funnel Btnfilter" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                        </svg>
                    </button>
                </p>
                <hr/>
                <table className='collapsetable'>
                <tr>
                    {Auction.map(A=> {
                          // Random component
                            const Over = () => 
                            <span id='Over'>
                                <td key={A.AuctionId} className='displayitem' style={{textAlign:"center"}}>  
                                     <div style={{borderRadius: "5%",background:"white"}}>
                                        <p></p>
                                        <p className='AuctionEnd'> OVER </p>
                                    <p>
                                            <img width="200px" height="200px" style={{borderRadius: "10%",border:"1px solid lightgrey"}} src={PhotoPath + A.AuctionImg} alt=""/>
                                        </p>                           
                                        <div style={{textAlign:"Left",marginLeft:"15%",marginRight:"15%"}}>
                                            <p><h5>{A.AuctionName}</h5> <span style={{float:"right"}}><Like/></span></p>
                                            <p>@{A.UserName}</p>
                                            <div> 
                                                <p>{A.AuctionDes}</p>
                                                <p><b style={{fontSize:"20px",textAlign:"left"}}>{A.AuctionEndAmt} SGD</b></p>
                                            </div>
                                        </div>
                                        <button type="button"  style={{backgroundColor:"lightgrey"}}
                                                className="btn mr-1" id="btn"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#ClaimModal"
                                                onClick={()=>this.Claim(A)} 
                                                >Claim
                                            </button>
                                        </div>     
                                        
                                    </td> 
                            </span>;
                            // Renderer callback with condition
                            const renderer = ({ days, hours, minutes, seconds, completed }) => {
                            if (completed) {
                                // var elem = document.getElementById('BidBtn');
                                // elem.parentNode.removeChild(elem);
                                // Render a completed state
                                return <Over/>;
                            } else {
                                // Render a countdown
                                return <span>
                                    <td key={A.AuctionId} className='displayitem' style={{textAlign:"center"}}>  
                                     <div style={{borderRadius: "5%", boxSizing: "border-box",background:"white"}}>
                                        <p></p>
                                    <p className='AuctionStart' id="Start">{days}D {hours}H {minutes}M {seconds}S </p>
                                    <p>
                                            <img width="200px" height="200px" style={{borderRadius: "10%",border:"1px solid lightgrey"}} src={PhotoPath + A.AuctionImg} alt=""/>
                                        </p>                           
                                        <div style={{textAlign:"Left",marginLeft:"15%",marginRight:"15%"}}>
                                            <p><h5>{A.AuctionName}</h5> <span style={{float:"right"}}><Like/></span></p>
                                            <p>@{A.UserName}</p>
                                            <div> 
                                                <p>{A.AuctionDes}</p>
                                                <p><b style={{fontSize:"20px",textAlign:"left"}}>{A.AuctionEndAmt} SGD</b></p>
                                            </div>
                                        </div>
                                        <div type="button"  style={{marginRight:"5%",backgroundColor:"lightgrey"}}
                                                className="btn mr-1" onClick={()=>{popup()}}>TryOn
                                            </div>
                                            <button type="button"  style={{backgroundColor:"lightgrey"}}
                                                className="btn mr-1" id="btn"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#exampleModal"
                                                onClick={()=>this.editClick(A)} 
                                                >Bid
                                            </button>
                                        </div>     
                                    </td> 
                                    </span>;
                                }
                            };
                            return(
                                 <Countdown date={new Date(A.AuctionEndDatetime).getTime()} renderer={renderer}/>          
                    )} 
                    
                    )}
                    </tr>
                </table>
                
                <div className="modal fade " id="exampleModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title w-100" >{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3 ">
                            
                            <div className="p-2 w-100 bd-highlight">

                                {AuctionId!==0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                onClick={()=>this.bid()}
                                >Bid by $5</button>
                                :null}
                        </div>

                        </div>
                        </div> 
                    </div>
                    </div>
                    </div>

                    <div className="modal fade " id="FilterModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title w-100" >{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3 ">
                            
                            <div className="p-2 w-100 bd-highlight">
                            <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/Listings/Listing">
                                <button className="btn mr-1 buttonColour">All</button>
                                </NavLink>
                            <button className="btn mr-1 buttonColour" style={{marginRight:"5%"}}>Product</button>             
                                <button className="btn mr-1 buttonColour" disabled={true}>Auction</button>
                                <br/>
                                <br/>
                            <div className="input-group mb-3">
                                    <span className="input-group-text">Type</span>
                                    <select className="form-select" onChange={this.changeTypefilter}>
                                        <option>Select Type</option>
                                        {Type.map(Type=><option key={Type.TypeId}>
                                            {Type.TypeName}
                                        </option>)}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Shape</span>
                                    <select className="form-select" onChange={this.changeShapefilter}>
                                        <option>Select Shape</option>
                                        {Shape.map(Shape=><option key={Shape.ShapeId}>
                                            {Shape.ShapeName}
                                        </option>)}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Material</span>
                                    <select className="form-select" onChange={this.changeMaterialfilter}>
                                        <option>Select Material</option>
                                        {Material.map(Material=><option key={Material.MaterialId}>
                                            {Material.MaterialName}
                                        </option>)}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Colour</span>
                                    <select className="form-select" onChange={this.changeColourfilter}>
                                        <option>Select Colour</option>
                                        {Colour.map(Colour=><option key={Colour.ColourId}>
                                            {Colour.ColourName}
                                        </option>)}
                                    </select>
                                </div>
                                <button type="button" data-bs-dismiss="modal"
                                className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                >Filter</button>
                        </div>

                        </div>
                        </div> 
                    </div>
                    </div>
                    </div>

                    <div className="modal fade " id="ClaimModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title w-100" >{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3 ">
                            
                            <div className="p-2 w-100 bd-highlight">

                                <button type="button" data-bs-dismiss="modal"
                                className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                onClick={()=>this.CfmClaim()}
                                >Claim</button>
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