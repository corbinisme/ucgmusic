
function Playlist(props){
    const data= props.data;
    const includes = props.includes;
    const currentItem = props.currentItem;
    const setCurrentMedia = props.setCurrentMedia;
    const type= props.type;
    const wrapperClass= type=="page"? "page_playlist": "bottom_scroll";
    const ulClass= type=="page"? "row": "item_ul";
    const listClass= type=="page"? "col-lg-3 col-md-6": "item_list";
    console.log("palylist includes", data)
    return (
        <div className="playlist_wrapper col">
            <h3>Playlist {type}</h3>
            <div className={wrapperClass}>
            <ul className={ulClass}>
            {data && data.map(item=>{

                let categoryArr = item.category;
                console.log("categoryArr", categoryArr)
                let catDisplay = [];
                /*if(categoryArr.length>0){
                    categoryArr.forEach(items=>{
                        
                        let categoryObj = includes.filter(cat=> cat.id == items);
                        console.log("categoryObj", items, item.category, categoryObj)
                        if(categoryObj.length==0){
                            return "";
                        }
                        catDisplay.push(categoryObj[0].attributes.name);
                    });
                    item.category = catDisplay.join(", ");
                }*/

                return (
                    <li key={item.id} className={`${(item.id==currentItem? "active": "")} ${listClass}`}>
                        
                        <h3><a className="title" onClick={()=>setCurrentMedia(item.id)}>{item.title}</a></h3>
                        <span>{item.musicians}</span>
                        <br />
                        <span>{item.category}</span>
                    </li>
                )
            })}
            </ul>
            </div>
        </div>
    )
}
export default Playlist;