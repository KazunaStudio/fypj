import React,{Component} from 'react';
import {variables} from './Variables.js';
import "./Table.css";
import swal from 'sweetalert';

export class AddProduct extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            Product:[],
            Colour:[],
            Shape:[],
            Type:[],
            Material:[],
            modalTitle:"",
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
            PhotoPath:variables.IMG_URL,
        }
    }

    refreshList(){
        fetch(variables.API_URL+'ProductList')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Product:data});
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

    //This is to add values into the variables for storing later
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
//This is to edit values into the variables for storing later
    editClick(P){
        this.setState({
            modalTitle:"Edit Product Listing",
            ProductId:P.ProductId,
            ProductName:P.ProductName,
            ProductDes:P.ProductDes,
            ProductType:P.ProductType,
            ProductShape:P.ProductShape,
            ProductMaterial:P.ProductMaterial,
            ProductColour:P.ProductColour,
            ProductAmt:P.ProductAmt,
            ProductImg:P.ProductImg
        });
    }

    //Save the variable into the database by calling the Web Api to call for the procedure to store data
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
            ProductAmt:this.state.ProductAmt,
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

    //Save the edited variable into the database by calling the Web Api to call for the procedure to store data
    updateClick(){
        fetch(variables.API_URL+'ProductList',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            ProductId:this.state.ProductId,
            ProductName:this.state.ProductName,
            UserName:this.state.UserName,
            ProductDes:this.state.ProductDes,
            ProductType:this.state.ProductType,
            ProductShape:this.state.ProductShape,
            ProductMaterial:this.state.ProductMaterial,
            ProductColour:this.state.ProductColour,
            ProductAmt:this.state.ProductAmt,
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
                fetch(variables.API_URL+'ProductList/'+id,{
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

        fetch(variables.API_URL+'ProductList/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({ProductImg:data});
        })
    }
   

    render(){
        const {
            Product,modalTitle,Colour,Shape,Type,Material,ProductId,ProductName,ProductDes,ProductType,ProductShape,ProductMaterial,ProductColour,ProductAmt,PhotoPath,ProductImg}=this.state;
        // End of Section A
            return(
            <div>
                <br/>
                <h1 style={{color:"Black", captionSide:"top", alignContent:"start",textAlign:"left"}}><b style={{fontSize:"35px"}}>Your Product Listing</b>
                </h1>

                <h3 style={{color:"Black", captionSide:"top", alignContent:"start",textAlign:"left"}}>Total Product: {Product.length}{/* Total no. of listing */}
                {/* Start creating a Product Listing */}
                <div type="button"
                className="btn m-2 float-end buttonColour roundButton"
                data-bs-toggle="modal"
                data-bs-target="#ProductModal"
                onClick={()=>this.addClick()}>
                    +
                </div>  </h3>
                <br/>
                <hr/> 
                <table className="collapsetable" >                                                                                    
                    <tbody>
                        {Product.map(P=>
                                <td key={P.ProductId} style={{textAlign:"center"}} className='displayitem'>
                                <div style={{borderRadius: "5%", boxSizing: "border-box",background:"white"}}> 
                                <p>
                                <img width="120px" height="120px" style={{borderRadius: "10%",border:"1px solid lightgrey"}} src={PhotoPath+P.ProductImg} alt=""/>
                                </p>
                                <p><b>{P.ProductName}</b><br/>
                                @{P.UserName}
                                    <button type="button"
                                        className="btn mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#ProductModal"
                                        onClick={()=>this.editClick(P)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                    </button>
                                    <br/>{P.ProductDes}
                                    <br/><b>Type : </b>{P.ProductType} | <b>Shape : </b>{P.ProductShape}
                                    <br/><b>Colour : </b>{P.ProductColour} | <b>Material  :</b>{P.ProductMaterial}
                                    <br/>Price: ${P.ProductAmt}
                                    <button type="button" 
                                        className="btn mr-1 float-end"
                                        onClick={()=>this.deleteClick(P.ProductId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                    </button>
                                </p>                               
                                </div> 
                                </td>
                        )}
                    </tbody>
                </table>

                 {/* Modal (popup) for inserting values/ editing values */}
                <div className="modal fade" id="ProductModal" tabIndex="-1" aria-hidden="true">
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
                            {ProductId===0?  
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
                        
                 </div>:null}
                        

                            {ProductId!==0?
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

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Product Name</span>
                                    <input type="text" className="form-control"
                                    onChange={this.changeProductName} value={ProductName}/>
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
            </div>
                
        )  
    }   
}
