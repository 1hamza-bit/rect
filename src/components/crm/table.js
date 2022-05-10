import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DataTable from 'react-data-table-component';


const styles = {
  height: 300,
  backgroundImage: `url(${"https://blog.prezi.com/wp-content/uploads/2019/03/water_ripple-1024x683.jpg"})`
};

function Taable() {
  const [tags, settags] = useState([]);
  const [title, settitle] = useState("")
  const baseurl =
    "https://crm-be.ginkgoretail.net/crm/tags/?page=1&limit=10&view_id=All";
  const authtoken = "fa988bfafec5edb21507a8d0268918b5736ac40e";

  const Authaxios = axios.create({
    baseURL: baseurl,
    headers: {
      Authorization: `token ${authtoken}`
    }
  });

  const handleGet = async () => {
    const res = await Authaxios.get(
      "https://crm-be.ginkgoretail.net/crm/tags/"
    );
    settags(res.data);
    console.log(tags)
  };
  useEffect(() => {
    handleGet();
  }, []);
  const handleDelete = id => {
    console.log("::::::", id)
    const res = Authaxios.delete(
      `https://crm-be.ginkgoretail.net/crm/tags/?id=${id}`
    );
    settags(res.data);
    console.log(res.data)
  };
  const handleSubmit = async () => {

    const data = {
      title
    };
    const res =
      await Authaxios.post(`https://crm-be.ginkgoretail.net/crm/tags/`, data)
        .then((res) => {
          settags(res.data);
        });
    console.log(res.data)
  }
  const handleUpdate = () => {

    const data = {
      title
    }
    const res =
      Authaxios.put(`https://crm-be.ginkgoretail.net/crm/tags/`, {
        id: 23,
        title: "Hello rld!",

      })
        .then((res) => {
          settags(res.data);
        });
    console.log(res.data)
  }

  const handleChange = (event) => {
    settitle(event.target.value)
  }

  const columns = [
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
      cell: row => (<Button onClick={() => handleDelete(row.id)} variant="danger" data-tag="allowRowEvents" data-action="delete">fwkelj</Button>)
      // cell: row => (<span>{row.title}</span>)


    },
    {
      name: 'Post',
      selector: '',
      cell: row => (<Button onClick={() => handleSubmit} variant="danger" data-tag="allowRowEvents" data-action="delete">+</Button>)
      // cell: row => (<span>{row.title}</span>)


    },

  ];
  const data = []


  console.log(":::::::", tags)
  return (<>
    <div styles={styles} className="App">
      <DataTable
        title="Customers"
        columns={columns}
        data={tags}
        highlightOnHover
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 15, 25, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Records per page:',
          rangeSeparatorText: 'out of',
        }}

      />
      <div>
        <h1>{title}</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="Insert name here"
        />
        <button onClick={handleUpdate}>Update Tag</button>
        <button onClick={handleSubmit}>Create Tag</button>
      </div>
      <button onClick={handleGet}>get notification</button>

    </div>
  </>);
}

export default Taable;