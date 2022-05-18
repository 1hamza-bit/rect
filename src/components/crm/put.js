import React, { Component } from 'react';
import axios from "axios";
import { Container, Grid, Button, TextField, Tab, Tabs, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearIcon from '@mui/icons-material/Clear';

import { CSVLink, CSVDownload } from "react-csv";

class Puts extends Component {
  state = {
    rows: [],
    isopen: true,
    
    view_data: {
      title: "",
      status: false,
      conditions: [],
      
    },
    dataToDownload: [],
   
  }

  columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,

    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
    },

    {
      name: 'Download',
      selector: '',
      cell: row => (<Button variant="danger" data-tag="allowRowEvents" data-action="delete">fwkelj</Button>)
      // cell: row => (<span>{row.title}</span>)


    },
    {
      name: 'Edit',
      selector: '',
      cell: row => (<Button onClick={() => this.handleUpdate(row.id, row.title)} variant="danger" data-tag="allowRowEvents" data-action="delete"><EditIcon/>edit</Button>)
      // cell: row => (<span>{row.title}</span>)


    },
  ]
  data = [];
  


  handleAddRow = (isAll) => {
    let { conditions } = this.state.view_data
    let condition = {
      name: "",
      operator: "",
      value: "",
      type: "add",
      isall: isAll,
    };
    conditions.push(condition)
    this.setState({
      // rows: [...this.state.rows, item]
      conditions: conditions
    });
  };


  handleRemoveSpecificRow = (index) => {
    let { conditions } = this.state.view_data
    conditions[index]['type'] = "remove"
    this.setState({ conditions: conditions })
  }



  handleUpadte = (key, value, index) => {
    console.log(index)
    let { view_data } = this.state

    view_data.conditions[index][key] = value
    this.setState({
      view_data: view_data
    })


  }

  handleUpadte2 = (key, value) => {
    let { view_data } = this.state
    view_data[key] = value
    this.setState({
      view_data: view_data
    })
    this.setState(this.state.view_data.status === "on" ? true : false);


  }
 
  handlecancel = (e) =>{
    e.preventDefault()
    this.setState({ isopen: true });

  }

  componentDidMount = () => {
    axios.get(`https://crm-be.ginkgoretail.net/crm/views/`, {
      headers: {
        Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
      }

    })
      .then(res => {
        const views = res.data;
        this.setState({ views });
        console.log("views data", res.data);

      })
  }

  handleUpdate = (id, title) => {

    this.setState({ isopen: false });
    console.log(title);
    const data = {
      id: id,
      isopen: "false",
      view_data: {
        title: "",
        status: false,
        conditions: this.state.rows,
      }

    }
    axios.get(`https://crm-be.ginkgoretail.net/crm/views/?id=${id}`, {
      headers: {
        Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
      }

    })
      .then(res => {
        this.setState({
          view_data: res.data
        })
        console.log(res.data);
      })
  }

  handleput = (e, id) => {
    e.preventDefault()
    this.setState({ isopen: true });
    this.setState({ title: this.state.view_data.title });
    this.setState({ conditions: this.state.view_data.conditions });
    console.log(this.state.view_data.title);
    // const data = {
    //   id: id,
    //   title: "new title",
    //   status: false,
    //   conditions: this.state.view_data.conditions,
    // }
    axios.put(`https://crm-be.ginkgoretail.net/crm/views/?id=${id}`, this.state.view_data, {
      headers: {
        Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
      }

    })
      .then(res => {
        // this.setState({name:res.data})
        console.log(res.data);
      })
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    });
  };
 

  render() {
    console.log(this.state.view_data)
    
    return (
      <div style={{padding: "5%"}}>
     
        {this.state.isopen ?
          <>
             
            <DataTable
              title="Views"
              columns={this.columns}
              data={this.state.views}
              highlightOnHover
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 15, 25, 50]}
              paginationComponentOptions={{
                rowsPerPageText: 'Records per page:',
                rangeSeparatorText: 'out of',
              }}

            />   </> :
          <>
            <Container maxWidth="lg">
            <Grid container direction="column" spacing={3}>
            <Grid item sm={8}> 
              <form onSubmit={(e) => this.handleput(e, this.state.view_data.id)}>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                  <h1 style={{margin: "0", padding: "2%"}}>Update View</h1>
                  <div>
                  <Button variant='basic' onClick={(e) =>this.handlecancel(e, this.state.view_data.id)}>cancel</Button>
               
                </div> <Button variant='contained' type="submit">Update</Button>

                </div>
                <br />
                <Grid item sm={6}>
                  <div style={{display: "flex"}}>
                  <TextField   id="standard-basic" name="title" label="Standard" variant="standard" value={this.state.view_data.title} onChange={(e) => this.handleUpadte2(e.target.name, e.target.value)}>
                  </TextField>
                  <FormControlLabel style={{paddingLeft: "10%"}} 
          control={
            <Switch checked={this.state.view_data.status  } value={this.state.view_data.status}  onChange={(e) => this.handleUpadte2(e.target.name, e.target.checked)}  name="status" />
          }
          label="Status"
        /></div>
                </Grid>

                <br />
                <Button color='primary' variant='contained'
                  onClick={() => this.handleAddRow(true)}
                // className="btn btn-default pull-left"
                >
                  And Condition
                </Button>
                {/* <Sidebar /> */}

                <Grid container direction="column" spacing={3}>
                <br />
                        <h4>the customers will have the following conditions</h4>

                  {this.state.view_data.conditions.map((condition, index) => (
                    condition.type !== "remove" && condition.isall !== false  &&
                    <div>
                      <Grid item key={index}>
                       

                        <Grid container direction="row" spacing={1}>

                          <Grid item sm={2}>
                            <TextField id="standard-basic" name="name" label="Standard" variant="standard" value={condition.name} onChange={(e) => this.handleUpadte(e.target.name, e.target.value, index)} />
                          </Grid>
                          <Grid item sm={2}>
                            <TextField id="standard-basic" name="operator" label="Standard" variant="standard" value={condition.operator} onChange={(e) => this.handleUpadte(e.target.name, e.target.value, index)} />                      </Grid>
                          <Grid item sm={2}>
                            <TextField id="standard-basic" name="value" label="Standard" variant="standard" value={condition.value} onChange={(e) => this.handleUpadte(e.target.name, e.target.value, index)} />                      </Grid>

                          <Grid item sm={2}>
                            {/* delete icon */}
                            <ClearIcon  onClick={() => this.handleRemoveSpecificRow(index)} style={{ color: "red"}} />
                          </Grid>
                          





                        </Grid>
                        <br />
                      </Grid>
                    </div>

                  ))}
                </Grid>
                <br /><br />

                 <Button color='primary' variant='contained'
                  onClick={() => this.handleAddRow(false)}
                // className="btn btn-default pull-left"
                >
                  Or Condition
                </Button>
                {/* <Sidebar /> */}

                <Grid container direction="column" spacing={3}>
                <br />
                        <h4>the customers will have the following conditions</h4>

                  {this.state.view_data.conditions.map((condition, index) => (
                    condition.type !== "remove" && condition.isall === false &&
                    <div>
                      <Grid item key={index}>
                       

                        <Grid container direction="row" spacing={1}>

                          <Grid item sm={2}>
                            <TextField id="standard-basic" name="name" label="Standard" variant="standard" value={condition.name} onChange={(e) => this.handleUpadte(e.target.name, e.target.value, index)} />
                          </Grid>
                          <Grid item sm={2}>
                            <TextField id="standard-basic" name="operator" label="Standard" variant="standard" value={condition.operator} onChange={(e) => this.handleUpadte(e.target.name, e.target.value, index)} />                      </Grid>
                          <Grid item sm={2}>
                            <TextField id="standard-basic" name="value" label="Standard" variant="standard" value={condition.value} onChange={(e) => this.handleUpadte(e.target.name, e.target.value, index)} />                      </Grid>

                          <Grid item sm={2}>
                            {/* delete icon */}
                            <ClearIcon  onClick={() => this.handleRemoveSpecificRow(index)} style={{ color: "red"}} />
                          </Grid>
                          





                        </Grid>
                        <br />
                      </Grid>
                    </div>

                  ))}
                </Grid>
   
                
              </form>
              </Grid>
              </Grid>
            </Container>
          </>
        }
      </div>
    );
  }

}
export default Puts;