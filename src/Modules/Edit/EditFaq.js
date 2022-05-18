import React,{Component} from 'react';
import "./Table.css";
import {variables} from '../Variables.js';

export class EditFaq extends Component{
    // Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            FAQ:[],
            FAQId:0,
            modalTitle:"",
            Question:"",
            Answers:"",
        }
    }
    
    refreshList(){
        fetch(variables.API_URL+'FAQ')
        .then(response=>response.json())
        .then(data=>{
            this.setState({FAQ:data});
        });
    }
    changeQuestion = (e)=>{
        this.setState({Question:e.target.value});
    }
    changeAnswer = (e)=>{
        this.setState({Answers:e.target.value});
    }

    componentDidMount(){
        this.refreshList();
    }

    addClick(){
        this.setState({
            modalTitle:"Add Question & Answers",
            FAQId:0,
            Question:"",
            Answers:"",
        });
    }

    editClick(Faq){
        this.setState({
            modalTitle:"Edit Question & Answers",
            FAQId:Faq.FAQId,
            Question:Faq.Question,
            Answers:Faq.Answers,    
        });
    }

    createClick(){
        fetch(variables.API_URL+'FAQ',{
            method:'POST',headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        body:JSON.stringify({
            Question:this.state.Question,
            Answers:this.state.Answers,   
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
        fetch(variables.API_URL+'FAQ',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FAQId:this.state.FAQId,
            Question:this.state.Question,
            Answers:this.state.Answers,                    
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
            fetch(variables.API_URL+'FAQ/'+id,{
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
        const{FAQ,FAQId,modalTitle,Question,Answers}=this.state;
        // End of Section A
        return(
            <div>
              <table className="table table-striped">
                <caption style={{color:"Black", captionSide:"top", alignContent:"start"}}><b style={{fontSize:"30px"}}>Edit FAQ</b><button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#FAQModal"
                onClick={()=>this.addClick()}>
                    + FAQ
                </button></caption>
                <thead>
                    <tr style={{textAlign:"left"}}>
                        <th>Question</th>
                        <th>Answers</th>
                    </tr>
                    </thead>                                                                                                             
                    <tbody>
                        {FAQ.map(Faq=>
                            <tr key={Faq.FAQId} style={{verticalAlign:"middle",textAlign:"left"}}>                                                                
                                <td style={{width:"20%"}}>{Faq.Question}</td>
                                <td>{Faq.Answers}</td>
                                <td style={{width:"10%"}}> <button type="button"
                                    className="btn mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#FAQModal"
                                    onClick={()=>this.editClick(Faq)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                    className="btn mr-1"
                                    onClick={()=>this.deleteClick(FAQ.FAQId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    </td>                               
                                </tr>
                            )}
                    </tbody>
                </table>
                <div className="modal fade" id="FAQModal" tabIndex="-1" aria-hidden="true">
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
                                    <span className="input-group-text">Question</span>
                                    <input type="text" className="form-control" value={Question}
                                    onChange={this.changeQuestion} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Answer</span>
                                    <textarea type="text" className="form-control" rows="10" value={Answers}
                                    onChange={this.changeAnswer} />
                                </div>
                        </div>
                        </div>

                            {FAQId===0?
                                <button type="button" data-bs-dismiss="modal"
                                className="btn btn-primary float-end"
                                onClick={()=>this.createClick()}
                                >Create</button>
                                :null}

                                {FAQId!==0?
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