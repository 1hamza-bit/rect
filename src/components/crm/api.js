import axios from "axios";
import React, { useState, useEffect } from "react";

function Apitag() {
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


    return (<>
   
  
  </>);
}

    export default Apitag;