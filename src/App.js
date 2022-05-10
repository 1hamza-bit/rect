import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Api from './components/api';
import Post from './components/Postapi';
import Put from './components/Put';
import Apis from './components/Apis';
import Get from './components/Apis/get';
import GetNotification from './components/crm'
import Imageupload from './components/ImageUpload';
import Taable from './components/crm/table';
import Postt from './components/crm/post';
import Views from './components/crm/views'
import Task from './components/crm/task'
function App() {
  return (
    <div >
      <Task/>
      {/* <Post />
    <Taable />  */}
      {/* <GetNotification/>  */}
      {/* <Imageupload />
      
      <Post /> */}
      {/* <Apis /> */}
     {/* <Api /> */}
     {/* <Post /> */}
     {/* <Put /> */}
    </div>
  );
}

export default App;
