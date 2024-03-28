import { useEffect, useState } from "react";
import YTplayer from "./Components/YTplayer";
import Player from "./Components/Player";
import Playlist from "./Components/Playlist";
import "./App.css";
import Productions from "./Components/Productions";
import Categories from "./Components/Categories";


function App() {

  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [includes, setIncludes] = useState([]);
  const s3base = "https://ucgweb.s3.us-east-1.amazonaws.com/music/?cb=" + new Date().getTime();
  //const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXrGtkWXvMyo-uEdNOSHxndZfsbQ_q3LYnJLSwDSr5g59P4dccfq9O2a9EHdrwOpZpsutdK5LQ15oJ/pub?output=tsv";
  const url = "/jsonapi/node/music?include=field_category";

  const setCurrentMedia = (item) => {
    setCurrentItem(item);
  }

  const setCurrentCategoryValue = (category) => {
    setCurrentCategory(category);
  }

  const justPlay = () => {
    setCurrentItem(data[0].id);
  }
 
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        let rows = data.data;
        let tempList = [];
        setIncludes(data.included);

        rows.forEach(element => {
          
          // only show non-public items
          if(element.attributes.field_is_public_ == false){
            let temp = {};
            let categoriesArr = element.relationships.field_category.data?element.relationships.field_category.data: null;
            let categoryIds = [];

            let correctCategory = currentCategory==""? true: false;
           
            if(categoriesArr.length>0){
              categoriesArr.forEach(function(item){
                categoryIds.push(item.id);
                if(item.id==currentCategory){
                  correctCategory = true;
                }
              });
            }


            temp["category"] = categoryIds.join(",");
            temp["music_link"] = element.attributes.field_music_link;
            temp["title"] = element.attributes.title;
            temp["video_link"] = element.attributes.field_video_link;
            temp["image_link"] = element.attributes.field_image_link;
            temp["musicians"] = element.attributes.field_musicians;
            temp["composer"] = element.attributes.field_composer;
            temp["lyrics"] = (element.attributes.body? element.attributes.body.value: null);
            
            temp['id'] = element.id;

            if(correctCategory){
              tempList.push(temp);
            }
            
          }

      });
      setData(tempList);

      });
  }, [currentCategory]);
  return (
    <div className="ucg_music">
      <button className='btn btn-secondary' onClick={()=>justPlay()}>Play All</button>
      <hr />
      {(data? 
      <>
      <Categories data={data} includes={includes} setCurrentCategory={setCurrentCategoryValue} currentCategory={currentCategory} />
      {false && <Playlist type="page" data={data} includes={includes} currentItem={currentItem} setCurrentMedia={setCurrentMedia} />}
      <Player list={data} setCurrentMedia={setCurrentMedia} currentItem={currentItem} includes={includes}  />
      </>
      : "loading...")}
      <hr />
      
    </div>
  );
}

export default App;
