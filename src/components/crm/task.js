import React, { Component } from 'react';
import axios from "axios";
import { Container, Grid, Button, TextField, Tab, Tabs, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DataTable from 'react-data-table-component';


const baseurl =
  "https://crm-be.ginkgoretail.net/crm/views/";
const authtoken = "fa988bfafec5edb21507a8d0268918b5736ac40e";

const Authaxios = axios.create({
  baseURL: baseurl,
  headers: {
    Authorization: `token ${authtoken}`
  }
});



const data = []

class Task extends Component {

  state = {
    rows: [],
    rows2: [],
    title: "",
    title2: "",
    status: false


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
      name: 'Name',
      selector: 'conditions',
      sortable: true,
    },



    {
      name: 'Download',
      selector: '',
      cell: row => (<Button onClick={() => this.handleDelete(row.id)} variant="danger" data-tag="allowRowEvents" data-action="delete">fwkelj</Button>)
      // cell: row => (<span>{row.title}</span>)


    },
    {
      name: 'Edit',
      selector: '',
      cell: row => (<Button onClick={this.handleAddRow2} variant="danger" data-tag="allowRowEvents" data-action="delete">edit</Button>)
      // cell: row => (<span>{row.title}</span>)


    },

  ];
 handleChange = event => {
    this.setState({ title: event.target.value });
  }
 

  handleAddRow2 = () => {
    let { rows2 } = this.state
    let item = {
      name: "",
      operator: "",
      value: "",
      type: "update"
    };
    rows2.push(item)
    this.setState({
      // rows: [...this.state.rows, item]
      rows2: rows2
    });
  };
 

  handleRemoveSpecificRow2 = (index) => {
    let { rows2 } = this.state
    rows2[index]['type'] = "remove"
    this.setState({ rows2: rows2 })
  }



  handleUpadte2 = (key, value, index, event) => {
    let { rows2 } = this.state
    rows2[index][key] = value
    this.setState({
      rows2: rows2
    })

  }

  handleAddRow = () => {
    let { rows } = this.state
    let item = {
      name: "",
      operator: "",
      value: "",
      type: "add"
    };
    rows.push(item)
    this.setState({
      // rows: [...this.state.rows, item]
      rows: rows
    });
  };
 

  handleRemoveSpecificRow = (index) => {
    let { rows } = this.state
    rows[index]['type'] = "remove"
    this.setState({ rows: rows })
  }



  handleUpadte = (key, value, index, event) => {
    let { rows } = this.state
    rows[index][key] = value
    this.setState({
      rows: rows
    })

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

  handleDelete = id => {
    
    console.log(":::::::::::", id)
    axios.delete(`https://crm-be.ginkgoretail.net/crm/views/?id=${id}`, {
      headers: {
        Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
      }

    })
      .then(res => {
        // this.setState({name:res.data})
        console.log(res.data);
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      title: this.state.title,
      status: this.state.status,
      conditions: this.state.rows

    }

    axios.post(`https://crm-be.ginkgoretail.net/crm/views/`, data, {
      headers: {
        Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
      }

    })
      .then(res => {
        //this.setState({title:res.data})
        console.log(res.data);
      })
  }

  handleUpdate = id => {
    const data = {
      title: this.state.title,
      status: this.state.status,
      conditions: this.state.rows

    }
    axios.put(`https://crm-be.ginkgoretail.net/crm/views/?id=${id}`,data, {
      headers: {
        Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
      }

    })
      .then(res => {
        //this.setState({title:res.data})
        console.log(res.data);
      })
  }




  render() {

    return (
      <div>
        <DataTable
          title="Customers"
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

        />


        <Container maxWidth="lg">
        <form onSubmit={this.handleSubmit}>
        <br />
        <Grid item sm={2}>

<TextField id="standard-basic" name="title" label="Standard" variant="standard" value={this.state.title} onChange={this.handleChange} />
</Grid>
<br />
          <Button color='primary' variant='contained'
            onClick={this.handleAddRow}
          // className="btn btn-default pull-left"
          >
            Add Condition
          </Button>
          {/* <Sidebar /> */}

          <Grid container direction="column" spacing={3}>
            {this.state.rows.map((condition, index) =>
              condition.type !== "remove" &&
              <>

               
                  <Grid item key={index}>
                  <br />
                 
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
                        <button className="btn btn-outline-danger"
                          onClick={() => this.handleRemoveSpecificRow(index)}>x</button>
                      </Grid>
                      


                    </Grid>

                  </Grid>

                
              </>
            )}

          </Grid>
          <br/><br/>
          <Button variant='contained' type="submit">post</Button>
          </form>

        </Container >

        {this.state.rows2.map((condition, index) =>
              condition.type !== "remove" &&
              <>

        <Container maxWidth="lg">
        <form onSubmit={() => this.handleUpdate()}>
        <br />
        <Grid item sm={2}>

<TextField id="standard-basic" name="title" label="Standard" variant="standard" value={this.state.title} onChange={this.handleChange} />
</Grid>
<br />
       
          {/* <Sidebar /> */}

          <Grid container direction="column" spacing={3}>
            

               
                  <Grid item key={index}>
                  <br />
                 
                    <Grid container direction="row" spacing={1}>

                      <Grid item sm={2}>
                        <TextField id="standard-basic" name="name" label="Standard" variant="standard" value={condition.name} onChange={(e) => this.handleUpadte2(e.target.name, e.target.value, index)} />
                      </Grid>
                      <Grid item sm={2}>
                        <TextField id="standard-basic" name="operator" label="Standard" variant="standard" value={condition.operator} onChange={(e) => this.handleUpadte2(e.target.name, e.target.value, index)} />                      </Grid>
                      <Grid item sm={2}>
                        <TextField id="standard-basic" name="value" label="Standard" variant="standard" value={condition.value} onChange={(e) => this.handleUpadte2(e.target.name, e.target.value, index)} />                      </Grid>



                      <Grid item sm={2}>
                        {/* delete icon */}
                        <button className="btn btn-outline-danger"
                          onClick={() => this.handleRemoveSpecificRow2(index)}>x</button>
                      </Grid>
                      


                    </Grid>

                  </Grid>
                  

                
              
            

          </Grid>
          <br/><br/>
          <Button variant='contained' type="submit">post</Button>
          </form>

        </Container >
        </>
        )}

      </div >
    );
  }
}

export default Task;