import React, { useEffect } from "react";
import './LandingPage.css';
import BasicCard from '../Layout/Card/Card'
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import Typewriter from "react-typing-effect";


const LandingPage = (props)=>{
    const navigate = useNavigate();
    console.log(props.details)

useEffect(()=> {
   let token= localStorage.getItem("access_token");
   if(!token) {
    navigate("/login")
   }else{
    navigate("/")

   }
   console.log(props)
},[navigate])

    return (<div className="landing" > 
     <div className="card1">
    </div>
    <h3 className="homeheading"><Typewriter text={`Hi ${props.details.name}, Welcome to I-Bank`}/></h3>
    <div className="card2">
    <Link to='/withdrawal'><BasicCard value='card-2-a'/></Link>
   <Link to='/balance'><BasicCard  details={props.details} value='card-2-b'/></Link> 
    </div>
 </div>)
    


 

}

export default LandingPage