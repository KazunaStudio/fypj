import React,{Component} from 'react';
import "./Table.css";
import {variables} from '../Variables.js';

export class EditOptions extends Component{
    constructor(props){
        super(props);

        this.state={
            Material:[],
            MaterialId:0,
            MaterialName:"",
            modalTitle:"",

            Colour:[],
            ColourId:0,
            ColourName:"",

            Type:[],
            TypeId:0,
            TypeName:"",

            Shape:[],
            ShapeId:0,
            ShapeName:"",


        }
    }
    
    refreshList(){
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
    changeMaterialName = (e)=>{
        this.setState({MaterialName:e.target.value});
    }
    changeTypeName = (e)=>{
        this.setState({TypeName:e.target.value});
    }
    changeColourName = (e)=>{
        this.setState({ColourName:e.target.value});
    }

    changeShapeName = (e)=>{
        this.setState({ShapeName:e.target.value});
    }

    componentDidMount(){
        this.refreshList();
    }

    addMaterial(){
        this.setState({
            modalTitle:"Add Material Option",
            FAQId:0,
            Question:"",
            Answers:"",
        });
    }

    editMaterial(M){
        this.setState({
            modalTitle:"Edit Material Option",
            MaterialId:M.MaterialId,
            MaterialName:M.MaterialName,   
        });
    }

    createMaterial(){
        fetch(variables.API_URL+'Material',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({
            MaterialName:this.state.MaterialName,
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

    updateMaterial(){
        fetch(variables.API_URL+'Material',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                MaterialId:this.state.MaterialId,
                MaterialName:this.state.MaterialName,                   
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

    deleteMaterial(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Material/'+id,{
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

    addType(){
        this.setState({
            modalTitle:"Add Type Option",
            FAQId:0,
            Question:"",
            Answers:"",
        });
    }

    editType(T){
        this.setState({
            modalTitle:"Edit Type Option",
            TypeId:T.TypeId,
            TypeName:T.TypeName,   
        });
    }

    createType(){
        fetch(variables.API_URL+'Type',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({
            TypeName:this.state.TypeName,
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

    updateType(){
        fetch(variables.API_URL+'Type',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TypeId:this.state.TypeId,
                TypeName:this.state.TypeName,                   
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

    deleteType(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Type/'+id,{
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

    addColour(){
        this.setState({
            modalTitle:"Add Colour Option",
            FAQId:0,
            Question:"",
            Answers:"",
        });
    }

    editColour(C){
        this.setState({
            modalTitle:"Edit Colour Option",
            ColourId:C.ColourId,
            ColourName:C.ColourName,   
        });
    }

    createColour(){
        fetch(variables.API_URL+'Colour',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({
            ColourName:this.state.ColourName,
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

    updateColour(){
        fetch(variables.API_URL+'Colour',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ColourId:this.state.ColourId,
                ColourName:this.state.ColourName,                   
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

    deleteColour(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Colour/'+id,{
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

    addShape(){
        this.setState({
            modalTitle:"Add Shape Option",
            FAQId:0,
            Question:"",
            Answers:"",
        });
    }

    editShape(S){
        this.setState({
            modalTitle:"Edit Shape Option",
            ShapeId:S.ShapeId,
            ShapeName:S.ShapeName,   
        });
    }

    createShape(){
        fetch(variables.API_URL+'Shape',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({
            ShapeName:this.state.ShapeName,
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

    updateShape(){
        fetch(variables.API_URL+'Shape',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ShapeId:this.state.ShapeId,
                ShapeName:this.state.ShapeName,                   
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

    deleteShape(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Shape/'+id,{
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
    render(){
        const{Material,MaterialId,modalTitle,MaterialName,Type,TypeId,TypeName,Colour,ColourId,ColourName,Shape,ShapeId,ShapeName}=this.state;
        return(
            <div>
              <table className="table">
                <caption style={{color:"Black", captionSide:"top", alignContent:"start"}}><b style={{fontSize:"30px"}}>Edit Listing Options</b>
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#SelectModal">
                    + Options
                </button></caption>
                <thead>
                    <tr style={{textAlign:"left"}}>
                        <th>Material</th>
                        <th>Type</th>
                        <th>Colour</th>
                        <th>Shape</th>
                    </tr>
                    </thead>                                                                                                             
                    <tbody>
                        <tr style={{verticalAlign:"middle",textAlign:"left"}}> 
                                                                                    
                            <td style={{width:"20%"}}>
                            {Material.map(M=> 
                            <div>
                            {M.MaterialName}
                            <button type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#MaterialModal"
                                onClick={()=>this.editMaterial(M)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>
                                <button type="button"
                                className="btn float-end"
                                onClick={()=>this.deleteMaterial(M.MaterialId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                                </div>  )}
                                </td>
                                 
                                <td style={{width:"20%"}}>
                            {Type.map(T=> 
                            <div>
                            {T.TypeName}
                            <button type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#TypeModal"
                                onClick={()=>this.editType(T)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>
                                <button type="button"
                                className="btn float-end"
                                onClick={()=>this.deleteType(T.TypeId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                                </div>  )}
                                </td> 

                                <td style={{width:"20%"}}>
                            {Colour.map(C=> 
                            <div>
                            {C.ColourName}
                            <button type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#ColourModal"
                                onClick={()=>this.editColour(C)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>
                                <button type="button"
                                className="btn float-end"
                                onClick={()=>this.deleteColour(C.ColourId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                                </div>  )}
                                </td>

                                    <td style={{width:"20%"}}>
                            {Shape.map(S=> 
                            <div>
                            {S.ShapeName}
                            <button type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#ShapeModal"
                                onClick={()=>this.editShape(S)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>
                                <button type="button"
                                className="btn float-end"
                                onClick={()=>this.deleteShape(S.ShapeId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                                </div>  )}
                                </td>                               
                            </tr>
                            
                    </tbody>
                </table>
                <div className="modal fade" id="SelectModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Choose Category to add options</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                            
                            <div className="p-2 w-100 bd-highlight">
                                <div>
                                <button type="button" data-bs-toggle="modal"
                                    data-bs-target="#MaterialModal" onClick={()=>this.addMaterial()}
                                className="btn buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue", marginLeft:"2%",marginRight:"2%"}}>
                                    Material
                                </button>
                                <button type="button" data-bs-toggle="modal"
                                    data-bs-target="#TypeModal"  onClick={()=>this.addType()}
                                className="btn buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue", marginLeft:"2%",marginRight:"2%"}}>
                                    Type
                                </button>
                                <button type="button" data-bs-toggle="modal"
                                    data-bs-target="#ColourModal"  onClick={()=>this.addColour()}
                                className="btn buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue", marginLeft:"2%",marginRight:"2%"}}>
                                    Colour
                                </button>
                                <button type="button" data-bs-toggle="modal"
                                    data-bs-target="#ShapeModal"  onClick={()=>this.addShape()}
                                className="btn buttonA" style={{border:"1px lightgrey",backgroundColor:"lightblue", marginLeft:"2%",marginRight:"2%"}}>
                                    Shape
                                </button>
                                </div>
                        </div>
                        </div>
                </div>
                </div> 
                </div>
            </div>

            <div className="modal fade" id="MaterialModal" tabIndex="-1" aria-hidden="true">
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
                                    <span className="input-group-text">Material Name</span>
                                    <input type="text" className="form-control" value={MaterialName}
                                    onChange={this.changeMaterialName} />
                                </div>

                        </div>
                        </div>

                            {MaterialId===0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.createMaterial()}
                                >Add</button>
                                :null}

                                {MaterialId!==0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.updateMaterial()}
                                >Update</button>
                                :null}
                        </div>

                </div>
                </div> 
                </div>

                <div className="modal fade" id="TypeModal" tabIndex="-1" aria-hidden="true">
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
                                    <span className="input-group-text">Type Name</span>
                                    <input type="text" className="form-control" value={TypeName}
                                    onChange={this.changeTypeName} />
                                </div>

                        </div>
                        </div>

                            {TypeId===0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.createType()}
                                >Add</button>
                                :null}

                                {TypeId!==0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.updateType()}
                                >Update</button>
                                :null}
                        </div>

                </div>
                </div> 
                </div>

                <div className="modal fade" id="ColourModal" tabIndex="-1" aria-hidden="true">
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
                                    <span className="input-group-text">Colour Name</span>
                                    <input type="text" className="form-control" value={ColourName}
                                    onChange={this.changeColourName} />
                                </div>

                        </div>
                        </div>

                            {ColourId===0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.createColour()}
                                >Add</button>
                                :null}

                                {ColourId!==0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.updateColour()}
                                >Update</button>
                                :null}
                        </div>

                </div>
                </div> 
                </div>

                <div className="modal fade" id="ShapeModal" tabIndex="-1" aria-hidden="true">
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
                                    <span className="input-group-text">Shape Name</span>
                                    <input type="text" className="form-control" value={ShapeName}
                                    onChange={this.changeShapeName} />
                                </div>

                        </div>
                        </div>

                            {ShapeId===0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.createShape()}
                                >Add</button>
                                :null}

                                {ShapeId!==0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.updateShape()}
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