import React,{Component} from 'react';
import {variables} from './Variables.js';
import "./Table.css";
import swal from 'sweetalert';
import {NavLink} from 'react-router-dom';

export class Cart extends Component{
    // Do Not Touch Section A
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
        const {
            Cart,PhotoPath}=this.state;
            // End of Section A

            // Calculate the total price in the cart
            const total = Cart.reduce((total, currentValue) => total = total + currentValue.PAmt,0);
        return(
            <div>
                  <h1 style={{color:"Black", captionSide:"top", alignContent:"start"}}>Cart</h1> 
                  <hr/>
                  {Cart.length!==0?
                  <div>
                  <p>Number of items: {Cart.length}</p>
                  <hr/>
                  <table className='collapsetable table table-striped' >
                      <tbody>
            {Cart.map(C=>
                <tr key={C.CartId} style={{textAlign:"center"}}>
                     <div style={{borderRadius: "5%", boxSizing: "border-box",background:"white"}}>
                         <br/>
                     <td style={{width:"25%"}}><img width="100px" height="100px" style={{borderRadius: "10%",border:"1px solid lightgrey"}} src={PhotoPath + C.PImg} alt=""/>
                    </td>
                    <td>
                     <p style={{fontSize:"25px",textAlign:"center",marginLeft:"5%"}}>{C.PName}</p>
                     </td>
                     <td style={{marginRight:"15px"}}>
                     <p style={{fontSize:"20px",textAlign:"right"}}>Price: ${C.PAmt}</p>
                     </td>
                     <br/>
               </div>
               <br/> 
                     </tr>)}
                </tbody>
                <tfoot>
                <tr style={{float:"right"}}>
                         <td></td>
                         <td style={{backgroundColor:"#FBFCF8",textAlign:"right"}}><b>Total:</b></td>
                         <td style={{textAlign:"left"}}>$
                        {total}
                        </td>
                         
                     </tr>
                </tfoot>
                </table>
                <br/>
                <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/Listings/Listing">
                                <button type="button" data-bs-dismiss="modal"
                                className="btn float-endx" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                >Continue Shopping</button>
                            </NavLink>
                <button className="btn float-end buttonColour2" type="button" data-bs-toggle="modal" data-bs-target="#COModal">CheckOut</button><div className="modal fade " id="COModal" tabIndex="-1" aria-hidden="true" style={{textAlign:"center"}}>
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title w-100" >CheckOut</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3 ">
                            
                            <div className="p-2 w-100 bd-highlight">
                            <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/CheckOut/Success">
                                <button type="button" data-bs-dismiss="modal"
                                className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                >GooglePay</button>
                            </NavLink>
                            <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/CheckOut/Success">
                                <button type="button" data-bs-dismiss="modal"
                                className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                >GrabPay</button>
                            </NavLink>
                        </div>

                        </div>
                        </div> 
                    </div>
                    </div>
                    </div>
                    </div>:null}
                    {Cart.length===0? 
                    <div>
                        <h2>There is no Items in your cart</h2>
                        <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/Listings/Listing">
                                <button type="button" data-bs-dismiss="modal"
                                className="btn" style={{border:"1px lightgrey",backgroundColor:"lightblue"}}
                                >Continue Shopping</button>
                            </NavLink>
                    </div>
                    :null}

                
            </div>      
        )  
    }   
}
