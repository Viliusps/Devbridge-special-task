import './App.css';
import React, {useState, useEffect} from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function App() {

  const [SelectedFile, setSelectedFile] = useState(null);
  const [EmployeeData, setEmployeeData] = useState(null);
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/employees").then(
      (resp) => (setEmployeeData(resp.data))
    );
  }, [])
  

  const onFileChange = event => {

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data)
        setSelectedFile(results.data);
      },
    });
   
  };
   
  const onFileUpload = () => {
   
    for(let i = 0; i < SelectedFile.length; i++)
    {
      axios.post('http://localhost:8080/api/employees', {
                        name: SelectedFile[i].full_name,
                        email: SelectedFile[i].email,
                        phone: SelectedFile[i].phone
                  })
    }
  };
  
  return (
    <div className="App">

      <br/>
      <input type="file" onChange={onFileChange} /><br/><br/>

      <button className="Upload" onClick={onFileUpload}>Upload</button><br/><br/><br/><br/>

      <table className="Table">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
            </tr>
  
            {(EmployeeData || []).map((employee, index) => (
              <tr data-index={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
              </tr>
            ))}
  
        </table>
      
      

    </div>
  );
}

export default App;
