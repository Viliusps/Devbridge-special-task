import './App.css';
import React, {useState} from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function App() {

  const [SelectedFile, setSelectedFile] = useState(null);
  
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
   
    console.log("uploaded");
    console.log(SelectedFile);
    //--------------------------
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
      <header className="App-header">
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      </header>
      

    </div>
  );
}

export default App;
