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

class Track extends Component {
  state = {
   id: ""
   
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
  

  handleChange = event => {
    this.setState({ id: event.target.value });
  }
 

  

  handleTrack = async(e,id) => {
    e.preventDefault()
   
    console.log(id);
   
   await axios.get(`https://crm-be.ginkgoretail.net/crm/views/?id=${id}`, {
      headers: {
        Authorization: 'token fa988bfafec5edb21507a8d0268918b5736ac40e'
      }

    })
      .then(res => {
        this.setState({
          view_data: res.data
        })
        console.log("viewdata",res.data);
      })
  }


 

  render() {
    console.log(this.state.view_data)
    
    return (
      <div style={{padding: "5%"}}>
     
            <form onSubmit={e => this.handleTrack(e,this.state.id)}>
                <h1>Track your order details</h1>
            <TextField id="standard-basic" name="id" label="Enter Id" variant="standard" value={this.state.id} onChange={this.handleChange}   />
            <Button variant='contained' type="submit">Get</Button>

            </form>
             
            <DataTable
              title="Views"
              columns={this.columns}
              data={this.state.view_data}
              highlightOnHover
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 15, 25, 50]}
              paginationComponentOptions={{
                rowsPerPageText: 'Records per page:',
                rangeSeparatorText: 'out of',
              }}

            />   
      </div>
    );
  }

}
export default Track;