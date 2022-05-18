import React,{Component} from 'react';
import "./Table.css";
import {variables} from './Variables.js';

export class AboutUs extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            CompanyInfo:[],
            ID:0,
            CompanyName:"",
            CompanyDes:"",
            CompanyVision:"",
            CompanyMission:"",
            CompanyValue:"",
            CompanyLogo:"empty.png",
            PhotoPath:variables.IMG_URL,

            Employees:[],
            EmployeeID:0,
            EmployeeName:"",
            EmployeeTitle:"",
            EmployeeImg:"",
            EmployeeImgPath:variables.IMG_URL,
        }
    }

    refreshList(){
        fetch(variables.API_URL+'CompanyInfo')
        .then(response=>response.json())
        .then(data=>{
            this.setState({CompanyInfo:data});
        });
        fetch(variables.API_URL+'Employees')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Employees:data, PosWithoutFilter:data});
        });
        fetch(variables.API_URL+'Position')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Position:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){ 
        const {CompanyInfo,Employees,EmployeeImgPath,PhotoPath,Position}=this.state;
        // End of Section A
        return(            
            <div> 
                {CompanyInfo.map(CInfo=>
                    <div>
                        <img width="320px" height="320px" src={PhotoPath+CInfo.CompanyLogo} alt=""/>
                    <table style={{width: "auto"}}>
                        <tbody key={CInfo.ID}>
                        <tr>
                            <td>
                                <p id='CompanyInfo' style={{paddingBottom:"30px"}}></p>
                                <h2>What Do We Offer?</h2>
                                <p>
                                    {CInfo.CompanyDes}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id='Vision,Mission,Value'  style={{paddingBottom:"30px"}}></p>
                            <h2>Vision</h2>
                            <p style={{paddingBottom:"30px"}}>                                
                                {CInfo.CompanyVision}
                            </p>
                            <h2>Mission</h2>
                            <p style={{paddingBottom:"30px"}}>
                                {CInfo.CompanyMission}
                            </p>
                            <h2>Value</h2>
                            <p>                                
                                {CInfo.CompanyValue}
                            </p>
                        </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                )}
                    <p style={{paddingBottom:"30px"}}  id='Team'></p>
                 <h2>Meet The Team</h2>  
                    <table className='collapsetable'>
                        <tbody>
                            <tr>
                                {Employees.map(Emp=>
                                    <td key={Emp.EmployeesID} className='collapsetd' style={{width:"25%"}}>
                                            <p><img style={{height:"200px",width:"200px",borderRadius:"50%",margin:"auto"}} src={EmployeeImgPath+Emp.EmployeeImg} alt=""/></p>
                                            <p>{Emp.EmployeeName} | {Emp.EmployeeTitle}</p>
                                    </td> )} 
                          </tr>
                        </tbody> 
                    </table>
               <br/>
            </div>
        )
    }
}