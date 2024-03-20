import { useEffect, useState } from "react";
import YTplayer from "./Components/YTplayer";
import Player from "./Components/Player";
import Playlist from "./Components/Playlist";
import "./App.css";


function App() {

  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const s3base = "https://ucgweb.s3.us-east-1.amazonaws.com/music/?cb=" + new Date().getTime();
  //const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXrGtkWXvMyo-uEdNOSHxndZfsbQ_q3LYnJLSwDSr5g59P4dccfq9O2a9EHdrwOpZpsutdK5LQ15oJ/pub?output=tsv";
  const url = "/jsonapi/node/music";

  const setCurrentMedia = (item) => {
    setCurrentItem(item);
  }
 
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        let rows = data.data;
        let tempList = [];

        rows.forEach(element => {
          
          if(element.attributes.field_is_public_ == false || true){
            let temp = {};
            
            temp["music_link"] = element.attributes.field_music_link;
            temp["title"] = element.attributes.title;
            temp["video_link"] = element.attributes.field_video_link;
            temp["image_link"] = element.attributes.field_image_link;
            temp["musicians"] = element.attributes.field_musicians;
            temp["composer"] = element.attributes.field_composer;
            temp["lyrics"] = (element.attributes.body? element.attributes.body.value: null);
            temp['id'] = element.id;
            tempList.push(temp);
            
          }

      });
      setData(tempList);

      });
  }, []);
  return (
    <div className="ucg_music">
      {(data? 
      <>
      <Playlist type="page" data={data} currentItem={currentItem} setCurrentMedia={setCurrentMedia} />
      <Player list={data} setCurrentMedia={setCurrentMedia} currentItem={currentItem} />
      </>
      : "loading...")}
      <hr />
      
    </div>
  );
}

export default App;
