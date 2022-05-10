import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
    state = {
        name:'',
        id:''
      }
      handleUpdate = () =>{
        axios.get(`https://jsonplaceholder.typicode.com/users/4`,{
            name:"hamza"
        })
        .then(res => {
          // this.setState({name:res.data})
          console.log(res.data);
        })
      }

      handleDelete = () =>{
        axios.delete(`https://jsonplaceholder.typicode.com/users/4`,{
            id:"2"
        })
        .then(res => {
          // this.setState({name:res.data})
          console.log(res.data);
        })
      }
      
      
      handleChange = event => {
        this.setState({ name: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        const user = {
            name:this.state.name
        }

        axios.post(`https://jsonplaceholder.typicode.com/users/`,{user})
          .then(res => {
            // this.setState({name:res.data})
            console.log(res.data);
          })
      }

    render() { 
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Person ID:
                <input type="text" name="name"  value={this.state.name} onChange={this.handleChange} />
              </label>
              <button type="submit">post</button>
            </form>
<button onClick={this.handleUpdate}>handleUpdate</button>
<button onClick={this.handleDelete}>handleDelete</button>
            
          </div>
        );
    }
}
 
export default Post;