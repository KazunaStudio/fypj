import React,{Component,useState} from 'react';
import {NavLink} from 'react-router-dom';
import "./Table.css";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {variables} from './Variables.js';
import Countdown from 'react-countdown';

export class Home extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            Banners:[],
            ImgId:0,
            Imgcaption:"",
            modalTitle:"",
            Bannerimg:"empty.png",
            PhotoPath:variables.IMG_URL,

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

            Product:[],
            ProductId:0,
            ProductName:"",     
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
            this.setState({Auction:data});
        });

        fetch(variables.API_URL+'BannerImages')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Banners:data});
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

    

    render(){
        const{Banners,PhotoPath,Auction,Product}=this.state;// End of section A
        const properties = {
            duration: 5000,
            transitionDuration: 500,
            indicators: true,
            arrows:false,
        }
        
        //A like function where netizen like a item, the heart will be filled. Default setting is a heart filled.
        function Like(){
            const [Heart, setHeart] = useState(true); //Default setting
            return(
                <span>
                    {Heart === false ? (
                        <div type="button" className="btn mr-1" onClick={() => setHeart(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg></div>
                            ) : (
                                //if clicked, it will set the setting to false which cause the heart to be only outlined
                                <div type="button" className="btn mr-1" onClick={() => setHeart(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                                </div>
                    )}
                    </span>  
            )
        }
        return(
            <div style={{marginBottom:"10%"}}>
                <div className="containerSize">
                    {/* This is the slideshow, please refer to document to check out the package. */}
                    <Fade {...properties}>
                        {/* This is where we loop the data to be displayed */}
                        {Banners.map(BI => (
                        <div className="each-fade" key={BI.ImgId}>
                            <div className="bannerSize">
                                <img src={PhotoPath+BI.Bannerimg} alt=""/>
                            </div>  

                        </div>
                        )
                        )}
                    </Fade>
                </div>
                <br/>
                <h1>Welcome To Reframe! 
                </h1>
                <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/Listings/Auction">
                <h2 style={{textDecorationLine:"underline"}}>Top Auctions</h2></NavLink>
                <table className='collapsetable'>
                <tr>
                    {/* Do not touch Section B */}
                    {Auction.map(A=> {
                          // Random component
                            const Over = () => 
                            <span id='Over'>
                                <td key={A.AuctionId} className='displayitem' style={{textAlign:"center"}}>  
                                     <div style={{borderRadius: "5%",background:"white"}}>
                                        <p onClick={(e)=>this.changeItemIdFilter(e,A.AuctionId)}></p>
                                        <p className='AuctionEnd'> OVER </p>
                                    <p>
                                            <img width="200px" height="200px" style={{borderRadius: "10%",border:"1px solid lightgrey"}} src={PhotoPath + A.AuctionImg} alt=""/>
                                        </p>                           
                                        <div style={{textAlign:"Left",marginLeft:"15%",marginRight:"15%"}}>
                                            <p><h5>{A.AuctionName}</h5> <span style={{float:"right"}}><Like/></span></p>
                                            <p>@{A.UserName}</p>
                                            <div> 
                                                <p><b style={{fontSize:"20px",textAlign:"left"}}>{A.AuctionEndAmt} SGD</b></p>
                                            </div>
                                        </div>
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
                                                <p><b style={{fontSize:"20px",textAlign:"left"}}>{A.AuctionEndAmt} SGD</b></p>
                                            </div>
                                        </div>
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
                    </tr>
                </table>
                <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/Listings/Products">
                <h2 style={{textDecorationLine:"underline"}}>Top Products</h2>
                </NavLink>
                <table className='collapsetable'>
                <tr>
                    {Product.map(P=> 
                                <td key={P.ProductId} className='displayitem' style={{textAlign:"center"}}>  
                                     <div style={{borderRadius: "5%",background:"white"}}>
                                    <p>
                                            <img width="200px" height="200px" style={{borderRadius: "10%",border:"1px solid lightgrey"}} src={PhotoPath + P.ProductImg} alt=""/>
                                        </p>                           
                                        <div style={{textAlign:"Left",marginLeft:"15%",marginRight:"15%"}}>
                                            <p><h5>{P.ProductName}</h5> <span style={{float:"right"}}><Like/></span></p>
                                            <p>@{P.UserName}</p>
                                            <div> 
                                                <p>{P.ProductDes}</p>
                                                <p><b style={{fontSize:"20px",textAlign:"left"}}>{P.ProductAmt} SGD</b></p>
                                            </div>
                                        </div>
                                        </div>                                             
                                    </td> 
                    )}
                    </tr>
                </table>

            </div>
        )
    }
}