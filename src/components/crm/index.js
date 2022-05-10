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

function GetNotification() {
  const [customers, setcustomers] = useState([]);
  const baseurl =
    "https://crm-be.ginkgoretail.net/crm/customers/?page=1&limit=10&view_id=All";
  const authtoken = "fa988bfafec5edb21507a8d0268918b5736ac40e";

  const Authaxios = axios.create({
    baseURL: baseurl,
    headers: {
      Authorization: `token ${authtoken}`
    }
  });

  const handleGet = async () => {
    const ress = await Authaxios.get(
      "https://crm-be.ginkgoretail.net/crm/customers/?page=1&limit=10&view_id=All"
    );
    setcustomers(ress.data.results);
    console.log(customers)
  };
  useEffect(() => {
    handleGet();
  }, []);
  const columns = [
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      cell: (row) => (row.first_name + ' ' + row.last_name)
    },
    {
      name: 'Customer id',
      selector: 'customer_id',
      sortable: true,
    },
    {
      name: 'Customer email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
    },
    {
      name: 'Last order',
      selector: 'last_order',
      sortable: true,
    },
    {
      name: 'Last order',
      selector: 'delivery_ratio[id] ',
      sortable: true,
    },
    {
      name: 'First name',
      selector: 'first_name',
      sortable: true,
    },
    {
      name: 'Download',
      selector: '',
      cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete">fwkelj</Button>
      
    },
    
  ];
  const data = []

  //   const handleUpdate = async () => {
  //     const data = {...item, email_cc:"test@gmail.com"}

  //     const result = await Authaxios.put(
  //       "https://crm-be.ginkgoretail.net/marketing/notifications/",data)
  //
  //     console.log("res", result.data);
  //     setitem(result.data);
  //     console.log(item)
  //   };

  //   const handleDelete = async () => {
  //     const data = {...item, id:"2" }

  //     const result = await Authaxios.delete(
  //       "https://jsonplaceholder.typicode.com/users/2",data)
  //
  //     console.log("res", result.data);
  //     setitem(result.data);
  //     console.log(item)
  //   };

  // function handleUpdate() {
  //     axios
  //       .put(`https://crm-be.ginkgoretail.net/marketing/notifications/`, {
  //         id:2,
  //         email_receiver:'hamza@gmail.com'
  //       })
  //       .then((response) => {
  //         setitem(response.data);
  //       });
  //   }

  //   if (!post) return "No post!"

  console.log(":::::::", customers)
  return (<>
    <div styles={styles} className="App">
      <DataTable
        title="Customers"
        columns={columns}
        data={customers}
        highlightOnHover
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 15, 25, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Records per page:',
          rangeSeparatorText: 'out of',
        }}

      />

      {/*       <button onClick={handleUpdate}>update notification</button> */}
      <button onClick={handleGet}>get notification</button>
      {/* <button onClick={handleDelete}>get notification</button> */}

      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">customer-ids</TableCell>
              <TableCell align="right">first name</TableCell>
              <TableCell align="right">Last name</TableCell>
              <TableCell align="right">Phone number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {customers && customers.map((customer) => (
              <div>

                <TableRow
                  key={customer.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {customer.id}
                  </TableCell>
                  <TableCell align="right">{customer.customer_id}</TableCell>
                  <TableCell align="right">{customer.first_name}</TableCell>
                  <TableCell align="right">{customer.last_name}</TableCell>
                  <TableCell align="right">{customer.phone}</TableCell>
                </TableRow>
              </div>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>);
}

export default GetNotification;