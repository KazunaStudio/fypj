import React,{Component, useState} from 'react';
import "./Table.css";
import {variables} from './Variables.js';
import Button from "react-bootstrap/Button";
import { Collapse } from "react-bootstrap";

export class FAQ extends Component{
    //Do not touch Section A
    constructor(props){
        super(props);

        this.state={
            FAQ:[],
            FAQId:"",
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

    componentDidMount(){
        this.refreshList();
    }

    render(){ 
        const {FAQ}=this.state;//End of section A
        return(            
            <div>
                <h1>Enquiry</h1>
                <hr/>
                <h4 style={{textDecorationLine:"underline",textAlign:"left"}}>General FAQ</h4>
                {FAQ.map(Faq=>{
                    function FAQTrans() {
                        // Set false to hide the answer
                    const [open, setOpen] = useState(false);
                        return (
                            <>
                            <div
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="box "
                            >
                             Q: {Faq.Question}
                            </div>
                            {/* When click on, the answers will collapse */}
                            <Collapse in={open}>
                            <div id="example-collapse-text" className='box2'>
                            {Faq.Answers}
                            </div>
                            </Collapse>
                            </>
                        );
                    }
                    return(
                        <div><FAQTrans/><br/></div>
                    )
                }
                )}
                <br/>
                <h4 style={{textDecorationLine:"underline",textAlign:"left"}}>Privacy Policy</h4>
                <div style={{fontSize:"20px"}}>
                <ol style={{textAlign:"left"}}>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Donec scelerisque odio quis purus tristique, et blandit quam cursus.</li>
                    <li>Etiam finibus tortor sit amet urna consectetur, at rhoncus eros lobortis.</li>
                    <li>Sed mollis ipsum eu est tincidunt rutrum.</li>
                    <li>Phasellus fringilla felis a augue sagittis, sed fringilla lorem cursus  </li>
                </ol>
                <br/>
                <h4 style={{textDecorationLine:"underline",textAlign:"left"}}>Terms & Conditions</h4>
                <ol style={{textAlign:"left"}}>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Donec scelerisque odio quis purus tristique, et blandit quam cursus.</li>
                    <li>Etiam finibus tortor sit amet urna consectetur, at rhoncus eros lobortis.</li>
                    <li>Sed mollis ipsum eu est tincidunt rutrum.</li>
                    <li>Phasellus fringilla felis a augue sagittis, sed fringilla lorem cursus  </li>
                </ol>
                <br/>
                
                <h4  style={{textDecorationLine:"underline",textAlign:"left"}}>
                    Other Enquiry
                </h4>
                <p style={{textAlign:"left"}}>Email: Reframed@mail.com</p>
                <p style={{textAlign:"left"}}>Phone No. : +65 9578 4809</p>
                </div>
            </div>
        )
    }
}