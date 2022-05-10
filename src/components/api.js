import React, { Component } from 'react';
import axios from 'axios';

class Api extends Component {
    state = {
        id: []
      }

      componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`,{
        
      })
      .then(res => {
            const persons = res.data;
            this.setState({ persons });
            console.log("person data",res.data);
          
          })
      }

    render() { 
        return (

            <div>
                hello
                <ol>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.name}</li>
            )
        }
      </ol>
            </div>
        );
    }
}
 
export default Api;