import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [data, setData] = useState([]);
  const s3base = "https://ucgweb.s3.us-east-1.amazonaws.com/music/";
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXrGtkWXvMyo-uEdNOSHxndZfsbQ_q3LYnJLSwDSr5g59P4dccfq9O2a9EHdrwOpZpsutdK5LQ15oJ/pub?output=tsv";
  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // split the data into rows
        const rows = data.split("\n");
        let counter = 0;
        let tempQuestions = [];
        console.log(rows);
        rows.forEach(element => {
          if(counter ==false){
              console.log("This is the header row");
          } else {
              let temp = {};
              const elements = element.split("\t");
              temp["file"] = elements[0];
              temp["title"] = elements[1];
              temp["performers"] = elements[2];
              tempQuestions.push(temp);
          
          }
          counter++;

      });
      console.log(tempQuestions);
      setData(tempQuestions);

      });
  }, []);
  return (
    <div className="App">
      <h1>Hi</h1>
      {data && data.map((item, index) => {

        return (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.performers}</p>
            <p>{s3base + item.file}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
