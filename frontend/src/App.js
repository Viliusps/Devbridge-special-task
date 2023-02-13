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
        setSelectedFile(results.data);
      },
    });
   
  };
   
  const onFileUpload = () => {

    if(SelectedFile == null){
      window.alert("Please select a file.");
    }

   else{

      for(let i = 0; i < SelectedFile.length; i++)
      {
        axios.post('http://localhost:8080/api/employees', {
                          name: SelectedFile[i].full_name,
                          email: SelectedFile[i].email,
                          phone: SelectedFile[i].phone
                    })
      }
      window.location.reload(false);
      document.getElementById("Table").setAttribute("hidden={false}");
    }
    
  };
  
  return (
    <div className="App">

      <br/>
      <input className="File" id="file" type="file" onChange={onFileChange} />
      <label className="Label" htmlFor="file">Select file...</label>
      <br/>

      <button className="Upload" onClick={onFileUpload}>Upload</button><br/><br/><br/><br/>

      <table id="Table" className="Table">
        <thead hidden={EmployeeData ? false : true}>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {(EmployeeData || []).map((employee, index) => (
            <tr data-index={index} key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>
            
  
        </table>
      
      

    </div>
  );
}

export default App;
