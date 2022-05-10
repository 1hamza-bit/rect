import React, { useState } from 'react';
import axios from "axios";

 
function Postt() {
 
  const [tags, settags] = useState('');
  const [title, settitle] = useState('');

  const [data, setData] = useState(null);
  const baseurl =
  "https://crm-be.ginkgoretail.net/crm/tags/";
const authtoken = "fa988bfafec5edb21507a8d0268918b5736ac40e";

const Authaxios = axios.create({
  baseURL: baseurl,
  headers: {
    Authorization: `token ${authtoken}`
  }
});
 
  const handleSubmit = () => {
   
    const data = {
      title: title,
      tags: tags
    }
    axios.post('https://crm-be.ginkgoretail.net/crm/tags', data).then(res => {
      setData(res.data);
      settitle('');
      settags('');
      
    })
  }
 
  return (
    <div className="container p-3">
      <h5 className="d-inline-block mb-3">POST request using axios with React Hooks - <a href="https://www.cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h5>
      <div style={{ maxWidth: 350 }}>
        <div classNames="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={title}
            onChange={e => settitle(e.target.value)} />
        </div>
        <div classNames="form-group">
          <label htmlFor="job" className="mt-2">Job</label>
          <input
            type="text"
            className="form-control"
            id="job"
            placeholder="Enter job"
            value={tags}
            onChange={e => settags(e.target.value)} />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          
        >{ 'Submit'}</button>
        {data && <div className="mt-3">
          <strong>Output:</strong><br />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        }
      </div>
    </div>
  );
}
 
export default Postt;