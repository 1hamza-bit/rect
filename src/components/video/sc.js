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

class Sc extends Component {
  state = {
    rows: [],
    isopen: true,
    view_data: {
      title: "",
      status: false,
      conditions: []
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
  


  handleAddRow = () => {
    let { conditions } = this.state.view_data
    let condition = {
      name: "",
      operator: "",
      value: "",
      type: "add"
    };
    conditions.push(condition)
    this.setState({
      // rows: [...this.state.rows, item]
      conditions: conditions
    });
  };


  
  componentDidMount = () => {
    axios.get(`https://videos-backends.herokuapp.com/magazines`, {
     

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
    axios.get(`https://videos-backends.herokuapp.com/magazines/?id=${id}`, {
     

    })
      .then(res => {
        this.setState({
          view_data: res.data
        })
        console.log(res.data);
      })
  }

 

  render() {
    console.log(this.state.view_data)
    
    return (
      <div style={{padding: "5%"}}>
     
   
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

            /> 
          
            <Container maxWidth="lg">
            <Grid container direction="column" spacing={3}>
            <Grid item sm={8}> 
         
              </Grid>
              </Grid>
            </Container>
       
      </div>
    );
  }

}
export default Sc;