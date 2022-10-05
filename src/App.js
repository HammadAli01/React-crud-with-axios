
import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function App() {

  const [users,setUsers]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isUpdate,setIsUpdate]=useState(false);
  const initialState={
    name:'',
    age:'',
    gender:''
  };
const [newUser,setNewUser]=useState(initialState);

  useEffect(()=>{
    getAllData();
    },[]);
    const getAllData=async()=>{
      try {
        
        const response = await axios.get('http://localhost:4000/posts')
        setUsers(response.data);
      } catch (error) {
        setError({
          message  :error.message || 'Something Went Wrong!'
        })
      }
      finally {
        setLoading(false)
      }
    
    }

const addData=async()=>{
  try {
        
    const response = await axios.post('http://localhost:4000/posts',newUser)
   getAllData();
setNewUser(initialState);
   console.log(response.data);
  } catch (error) {
    setError({
      message  :error.message || 'Something Went Wrong while adding data!'
    })
  }
  
}
const handleDelete=async(id)=>{
  try {
        
    const response = await axios.delete(`http://localhost:4000/posts/${id}`)
   getAllData();
setNewUser(initialState);
   console.log(response.data);
  } catch (error) {
    setError({
      message  :error.message || 'Something Went Wrong while adding data!'
    })
  }
}
const inputChangeHandler=(e)=>{

  setNewUser((currentState)=>({...currentState, [e.target.name]:e.target.value}));
}
const handleUpdate=(row)=>{
  setIsUpdate(true);
  setNewUser({ name:row.name,
  age:row.age,
  gender:row.gender,id:row.id});
}
const updateData=async()=>{
  try {
        
    const response = await axios.put(`http://localhost:4000/posts/${newUser.id}`,newUser);
   getAllData();
setNewUser(initialState);
setIsUpdate(false);
   console.log(response.data);
  } catch (error) {
    setError({
      message  :error.message || 'Something Went Wrong while updating data!'
    })
  }
}


    if(loading) return <h1>loading....</h1>
    if(error) return <h1>{error.message}</h1>

  return (
    <div className="App">
<table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Actions</th>

        </tr>
        {users.length ===0 ? <h1>No Users available</h1>  :  users.map((val,key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.gender}</td>
              <td><button onClick={()=>{handleUpdate(val)}}>Update</button></td>
              <td><button onClick={()=>handleDelete(val.id)}>Delete</button></td>
            </tr>
          )
        })}
        <br/>
        <tr>
<td><input placeholder='Enter name' name="name" value={newUser.name} onChange={(e)=>{inputChangeHandler(e)}}></input></td>
<td><input placeholder='Enter age' name="age" value={newUser.age} onChange={(e)=>{inputChangeHandler(e)}}></input></td>
<td><input placeholder='Enter gender'name="gender" value={newUser.gender} onChange={(e)=>{inputChangeHandler(e)}}></input></td>
<td><button onClick={()=>{isUpdate?updateData():addData()}}>{isUpdate?<h4>Update</h4>:<h4>Add</h4>}</button></td>
        </tr>
        
        
      </table>      
    </div>
  );
}

export default App;
