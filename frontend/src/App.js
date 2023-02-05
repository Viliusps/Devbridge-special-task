import './App.css';
import React, {useState} from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';


function App() {

  const [SelectedFile, setSelectedFile] = useState(null);
  
  const onFileChange = event => {
   
    console.log("changed");
    setSelectedFile({ File: event.target.files[0] });
   
  };
   
  const onFileUpload = () => {
   
    console.log("uploaded")

  };

  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload =  (e) => {
      // Use reader.result
      this.setState({
        csvData: reader.result
      })
    }
    reader.readAsText(files[0]);
  }
  
  return (
    <div className="App">
      <header className="App-header">
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>

      <CsvToHtmlTable
        data={SelectedFile || ""}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
      />
      </header>
      

    </div>
  );
}

export default App;
