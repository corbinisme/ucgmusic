
function Playlist(props){
    const data= props.data;
    const includes = props.includes;
    const currentItem = props.currentItem;
    const setCurrentMedia = props.setCurrentMedia;
    const type= props.type;
    const wrapperClass= type=="page"? "page_playlist": "bottom_scroll";
    const ulClass= type=="page"? "row": "item_ul";
    const listClass= type=="page"? "col-lg-3 col-md-6": "item_list";

    return (
        <div className="playlist_wrapper col">
            <h3>Playlist {type}</h3>
            <div className={wrapperClass}>
            <ul className={ulClass}>
            {data && data.map(item=>{

                let categoryArr = [];
                if(item.category.indexOf(",")>-1){
                    let categorySplits = item.category.split(",");
                    categorySplits.forEach(cat=> categoryArr.push(cat));
                } else {
                    if(item.category!="")
                        categoryArr.push(item.category);
                }

                

                
                let catDisplay = [];
                if(categoryArr.length>0){
                   categoryArr.forEach(cat=>{
                        let catObj = includes.find(obj=> obj.id==cat);
                        if(catObj){
                            let temp = {
                                id: catObj.id,
                                name: catObj.attributes.name
                            }
                            catDisplay.push(temp);
                        }
                    });
                   
                }


                return (
                    <li key={item.id} className={`${(item.id==currentItem? "active": "")} ${listClass}`}>
                        
                        <span className='fw-bold'>
                            <a className="title" onClick={()=>setCurrentMedia(item.id)}>{item.title}</a>
                        </span>
                        <span className="musician d-block">{item.musicians}</span>
                        <span>{(catDisplay.length>0? 
                            catDisplay.map((cat)=>{
                                return (
                                    <span className="badge bg-primary" data-id={cat.id} key={cat.id}>{cat.name}</span>
                                )
                            }): "")}</span>
                    </li>
                )
            })}
            </ul>
            </div>
        </div>
    )
}
export default Playlist;