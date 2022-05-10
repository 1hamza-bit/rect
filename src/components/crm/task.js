import React, { Component } from 'react';
import axios from "axios";
import { Container, Grid, Button, TextField, Tab, Tabs,Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const baseurl =
"https://crm-be.ginkgoretail.net/crm/views/";
const authtoken = "fa988bfafec5edb21507a8d0268918b5736ac40e";

const Authaxios = axios.create({
baseURL: baseurl,
headers: {
  Authorization: `token ${authtoken}`
}
});

class Task extends Component {
   
    state = { 
        id: "",
        rows: [],
        views:""
      } 

      handleAddRow = () => {
        let {rows} = this.state
        let item = {
          name: "",
          operator: "",
          type: ""
        };
        rows.push(item)
        this.setState({
          // rows: [...this.state.rows, item]
          rows: rows
        });
      };
      handleRemoveRow = () => {
        this.setState({
          rows: this.state.rows.slice(0, -1)
        });
      };
    
      handleRemoveSpecificRow = (index) => {
        let { rows } = this.state
        rows[index]['type'] = "remove"
        this.setState({ rows: rows })
      }
    
     
    
      handleUpadte = (key, value, index,event) => {
        let { rows } = this.state
        rows[index][key] = value
        this.setState({
          rows: rows
        })
        
      }
    

    componentDidMount = () => {
        axios.get(`https://crm-be.ginkgoretail.net/crm/views/`,{
            headers: {
                Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
              }
        
      })
      .then(res => {
            const views = res.data;
            this.setState({ views });
            console.log("views data",res.data);
          
          })
      }
  
    render() { 
        return (
            <div>

            <Container maxWidth="lg">
              <Button color='primary' variant='contained'
                onClick={this.handleAddRow}
                // className="btn btn-default pull-left"
              >
                Add Row
              </Button>
              {/* <Sidebar /> */}
    
              <Grid container direction="column" spacing={3}>
                {this.state.rows.map((condition, index) =>
                  condition.type !== "remove" &&
                  <>
             
    
                    <Grid item key={index}>
                      <Grid container direction="row" spacing={3}>
                        
                        <Grid item>
                          <TextField id="standard-basic" name="name" label="Standard" variant="standard" value={condition.name} onChange={(e) => this.handleUpadte("name", e.target.value, index)} />
                        </Grid>
                        <Grid item>
                          <TextField id="standard-basic" name="operator" label="Standard" variant="standard" value={condition.operator} onChange={(e) => this.handleUpadte("operator", e.target.value, index)} />
                        </Grid>
                        <Grid item>
                          {/* delete icon */}
                          <button className="btn btn-outline-danger"
                            onClick={() => this.handleRemoveSpecificRow(index)}>x</button>
                        </Grid>
               
    
                      </Grid>
                     
                    </Grid>
                    
    
                  </>
                )}
    
              </Grid>
    
         
    
            </Container >
    
          </div >
        );
    }
}
 
export default Task;