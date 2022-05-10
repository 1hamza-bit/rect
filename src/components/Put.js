import React, { Component } from 'react';
import axios from "axios";


class Put extends Component {
    state = {
        name: '',
        job: ''
      }
   
   handleSubmit = event => {
    event.preventDefault();
      
    axios.get('https://reqres.in/api/users/').then(res => {
        
       this.setstate(res.data);
        console.log("111111",this.state);
      
      });
    }
    render() {
    return (
      <div >
       <input type="text" />
      </div>
    );
  }
}  
 
export default Put;