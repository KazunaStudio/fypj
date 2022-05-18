import React,{Component} from 'react';
import {variables} from './Variables.js';

export class CompanyInfo extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            CompanyInfo:[],
            modalTitle:"",
            ID:0,
            CompanyName:"",
            CompanyDes:"",
            CompanyVision:"",
            CompanyMission:"",
            CompanyValue:"",
            CompanyLogo:"empty.png",
            PhotoPath:variables.IMG_URL,
        }
    }
    
    refreshList(){
        fetch(variables.API_URL+'CompanyInfo')
        .then(response=>response.json())
        .then(data=>{
            this.setState({CompanyInfo:data});
        });
    }

    changeCompanyName = (e)=>{
        this.setState({CompanyName:e.target.value});
    }

    changeCompanyDes = (e)=>{
        this.setState({CompanyDes:e.target.value});
    }

    changeCompanyVision= (e)=>{
        this.setState({CompanyVision:e.target.value});
    }

    changeCompanyMission= (e)=>{
        this.setState({CompanyMission:e.target.value});
    }
    changeCompanyValue= (e)=>{
        this.setState({CompanyValue:e.target.value});
    }

    componentDidMount(){
        this.refreshList();
    }

editClick(CInfo){
    this.setState({
        modalTitle:"Edit Company Info",
        ID:CInfo.ID,
        CompanyName:CInfo.CompanyName,
        CompanyDes:CInfo.CompanyDes,
        CompanyVision:CInfo.CompanyVision,
        CompanyMission:CInfo.CompanyMission,
        CompanyValue:CInfo.CompanyValue,
        CompanyLogo:CInfo.CompanyLogo,
    });
}

updateClick(){
    fetch(variables.API_URL+'CompanyInfo',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
        ID:this.state.ID,
        CompanyName:this.state.CompanyName,
        CompanyDes:this.state.CompanyDes,
        CompanyVision:this.state.CompanyVision,
        CompanyMission:this.state.CompanyMission,
        CompanyValue:this.state.CompanyValue,
        CompanyLogo:this.state.CompanyLogo            
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

imageUpload=(e)=>{
    e.preventDefault();

    const formData=new FormData();
    formData.append("file",e.target.files[0],e.target.files[0].name);

    fetch(variables.API_URL+'CompanyInfo/savefile',{
        method:'POST',
        body:formData
    })
    .then(res=>res.json())
    .then(data=>{
        this.setState({CompanyLogo:data});
    })
}

render(){
    const{CompanyInfo,ID,modalTitle,CompanyName,CompanyDes,CompanyLogo,CompanyMission,CompanyValue,CompanyVision,PhotoPath}=this.state;
    // End of section A
    return(
        <div>
            <table className="table table-striped">
            <caption style={{color:"Black", captionSide:"top", alignContent:"start"}}><b style={{fontSize:"35px"}}>Company Infomation</b></caption>
            <tbody>
                        {CompanyInfo.map(CInfo=>
                            <tr key={CInfo.EmployeeId} style={{verticalAlign:"middle"}}>                                                                
                                <td>    
                                <img width="320px" height="320px" src={PhotoPath+CInfo.CompanyLogo} alt=""/>
                                    <br/>
                                    <b>What Do We Offer</b>
                                    <button type="button"
                                    className="btn btn-none mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={()=>this.editClick(CInfo)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <p>{CInfo.CompanyDes}</p>
                                    <b>Vision</b><p>{CInfo.CompanyVision}</p>
                                    <b>Mission</b><p>{CInfo.CompanyMission}</p>
                                    <b>Value</b><p>{CInfo.CompanyValue}</p>
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
                            
                            <div className="p-3 w-100 bd-highlight">
                            <div className="input-group mb-3">
                                <img width="250px" height="250px" src={PhotoPath+CompanyLogo} alt=""/>
                                <input className="m-2" type="file" onChange={this.imageUpload}/>
                            </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Company Name</span>
                                    <input type="text" className="form-control" 
                                    onChange={this.changeCompanyName} value={CompanyName}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Company Description</span>
                                    <textarea type="text" className="form-control" size="150" style={{height:"320px", width:"300px"}}
                                    value={CompanyDes}
                                    onChange={this.changeCompanyDes}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Company Vision</span>
                                    <br/>
                                    <input type="text" className="form-control" size="150" style={{height:"220px", width:"400px"}}
                                    value={CompanyVision}
                                    onChange={this.changeCompanyVision}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Company Mission</span>
                                    
                                    <textarea type="text" className="form-control" size="200" style={{height:"220px", width:"400px"}}
                                    value={CompanyMission}
                                    onChange={this.changeCompanyMission}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Company Value</span>
                                    <textarea type="text" className="form-control" size="200" style={{height:"220px", width:"400px"}}
                                    value={CompanyValue}
                                    onChange={this.changeCompanyValue}/>
                                </div>       
                            
                            
                            </div>

                            
                            </div>

                            {ID===0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.createClick()}
                                >Create</button>
                                :null}

                                {ID!==0?
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
