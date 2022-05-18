import React,{Component} from 'react';
import {variables} from './Variables.js';
import "./Table.css";

export class Store extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            StoreLoc:[],
            StoreId:0,
            StoreName:"",
            modalTitle:"",
            StoreStreet:"",
            StorePostalCode:"",
            StoreOpHrs:"",
            lat:"",
            lng:"",
            Storelogo:"empty.png",
            PhotoPath:variables.IMG_URL,

            AddressFilter:"",
            AddressWithoutFilter:[],
        }
    }
    
    FilterFn(){
        var AddressFilter = this.state.AddressFilter;

        var AfilteredData=this.state.AddressWithoutFilter.filter(
            function(el){
                return el.StoreStreet.toString().toLowerCase().includes(AddressFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({StoreLoc:AfilteredData});

    }

    changeAddressFilter = (e)=>{
            this.state.AddressFilter = e.target.value;
            this.FilterFn(); 
        }

    refreshList(){
        fetch(variables.API_URL+'StoreLoc')
        .then(response=>response.json())
        .then(data=>{
            this.setState({StoreLoc:data, AddressWithoutFilter:data});
        });
    }

    changeStoreName = (e)=>{
        this.setState({StoreName:e.target.value});
    }

    changeStorePostalCode = (e)=>{
        this.setState({StorePostalCode:e.target.value});
    }

    changeStoreOpHrs = (e)=>{
        this.setState({StoreOpHrs:e.target.value});
    }
    
    changeStorePh = (e)=>{
        this.setState({StorePh:e.target.value});
    }

    changeStoreStreet = (e)=>{
        this.setState({StoreStreet:e.target.value});
    }

    changelat = (e)=>{
        this.setState({lat:e.target.value});
    }

    changelng = (e)=>{
        this.setState({lng:e.target.value});
    }


    componentDidMount(){
        this.refreshList();
    }

    addClick(){
        this.setState({
            modalTitle:"Add StoreLoc",
            StoreId:0,
            StoreName:"",
            StoreStreet:"",
            StorePostalCode:"",
            StoreOpHrs:"",
            StorePh:"",
            Storelogo:"empty.png",
        });
    }

    editClick(SLoc){
        this.setState({
            modalTitle:"Edit StoreLoc Info",
            StoreId:SLoc.StoreId,
            StoreName:SLoc.StoreName,
            StoreStreet:SLoc.StoreStreet,
            StorePostalCode:SLoc.StorePostalCode,
            StoreOpHrs:SLoc.StoreOpHrs,
            StorePh:SLoc.StorePh,
            Storelogo:SLoc.Storelogo,
            lat:SLoc.lat,
            lng:SLoc.lng,       
        });
    }

    createClick(){
        fetch(variables.API_URL+'StoreLoc',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({
            StoreName:this.state.StoreName,
            StoreStreet:this.state.StoreStreet,
            StorePostalCode:this.state.StorePostalCode,
            StoreOpHrs:this.state.StoreOpHrs,
            StorePh:this.state.StorePh,
            Storelogo:this.state.Storelogo,
            lat:this.state.lat,
            lng:this.state.lng   
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
    }

    updateClick(){
        fetch(variables.API_URL+'StoreLoc',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            StoreId:this.state.StoreId,
            StoreName:this.state.StoreName,
            StoreStreet:this.state.StoreStreet,
            StorePostalCode:this.state.StorePostalCode,
            StoreOpHrs:this.state.StoreOpHrs,
            StorePh:this.state.StorePh,
            Storelogo:this.state.Storelogo,
            lat:this.state.lat,
            lng:this.state.lng,                   
            })            
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'StoreLoc/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
            }
    }

    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'StoreLoc/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({Storelogo:data});
        })
    }

    render(){
        const {
            StoreLoc,modalTitle,StoreId,StoreName,StorePostalCode,StoreStreet,StoreOpHrs,StorePh,Storelogo,PhotoPath,lat,lng}=this.state;
            // End of section A
        return(
            <div>
                 <input className="form-control m-2" onChange={this.changeAddressFilter} placeholder="Store Location"/>
                <table className="table table-striped">
                <caption style={{color:"Black", captionSide:"top", alignContent:"start"}}><b style={{fontSize:"30px"}}>StoreLoc</b><button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    + Store Location
                </button></caption>                                                                                                             
                    <tbody>
                        {StoreLoc.map(SLoc=>
                            <tr key={SLoc.StoreId} style={{verticalAlign:"middle"}}>                                                                
                                <td><img width="220px" height="220px" src={PhotoPath+SLoc.Storelogo} alt=""/></td>
                                <td style={{textAlign:"left"}}>Name: {SLoc.StoreName} ({SLoc.StoreId})
                                <br/>
                                Address: {SLoc.StoreStreet} S{SLoc.StorePostalCode}
                                <br/>
                                Opening Hours: {SLoc.StoreOpHrs}
                                <br/>
                                Ph No.: {SLoc.StorePh}
                                <br/>
                                Lat: {SLoc.lat} Lng: {SLoc.lng}

                                
                                </td>
                                <td> <button type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={()=>this.editClick(SLoc)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                    className="btn btn-light mr-1"
                                    onClick={()=>this.deleteClick(SLoc.StoreId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    </td>                               
                                </tr>
                            )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
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
                            <div className="p-2 w-50 bd-highlight">
                                <img width="300px" height="300px" src={PhotoPath+Storelogo} alt=""/>
                                <input className="m-2" type="file" onChange={this.imageUpload}/>
                            </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Store Name</span>
                                    <input type="text" className="form-control"
                                    onChange={this.changeStoreName} value={StoreName}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Street</span>
                                    <input type="text" className="form-control"
                                    value={StoreStreet}
                                    onChange={this.changeStoreStreet} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Postal Code</span>
                                    <input type="text" className="form-control"
                                    value={StorePostalCode}
                                    onChange={this.changeStorePostalCode}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Opening Hours</span>
                                    <input type="text" className="form-control"
                                    value={StoreOpHrs}
                                    onChange={this.changeStoreOpHrs}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Contact Number (+65)</span>
                                    <input type="text" className="form-control"
                                    value={StorePh}
                                    onChange={this.changeStorePh}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Latitude</span>
                                    <input type="text" className="form-control"
                                    value={lat}
                                    onChange={this.changelat}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Longitude</span>
                                    <input type="text" className="form-control"
                                    value={lng}
                                    onChange={this.changelng}/>
                                </div>
        
                            
                        </div>
                        </div>

                            {StoreId===0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.createClick()}
                                >Create</button>
                                :null}

                                {StoreId!==0? 
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.updateClick()}
                                >Update</button>
                                :null}
                        </div>

                </div>
                </div> 
                </div>
            </div>
            
        )
    }
}
