import React,{Component,useState} from 'react';
import "./Table.css";
import {NavLink} from 'react-router-dom';
import { Container } from "react-bootstrap";
import {variables} from './Variables.js';
import swal from 'sweetalert';

export class Success extends Component{
    // Do not touch Section A
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

deleteClick(id){
            fetch(variables.API_URL+'Cart/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
                this.refreshList();
            },(error)=>{
                swal('Oops!','Failed','error');
            });
            } 

    render(){
        const {Cart}=this.state;
        // End of Section A

        // Calculate the total price in the cart
        const total = Cart.reduce((total, currentValue) => total = total + currentValue.PAmt,0);
        return(
            <div className='homeDisplay'>
                <Container className='ContainerS'>
                    <br/>
            <h1>Payment Successful!</h1>
            <h3>Total Item: {Cart.length}</h3>
            <hr/>
            <br/>
            
                <table className='paymenttable'>
                    {Cart.map(C=>
                    <tr>
                        <td style={{textAlign:"Left"}}>{C.PName}</td>
                        <td style={{textAlign:"right"}}>${C.PAmt}</td>
                    </tr> )}
                    <tr>
                        <td style={{textAlign:"right"}}>Total:</td>
                        <td style={{textAlign:"right"}}>${total}</td>
                    </tr>
                </table>
               
                <br/>
            <NavLink className="d-inline p-2 fontstyle" reloadDocument to="/Modules/Listings/Listing" ><button className='buttonColour'  onClick={()=>this.deleteClick("1")}>Return to Listing</button>
            </NavLink>
            <br/><br/>
            </Container>
            </div>
        )
    }
}