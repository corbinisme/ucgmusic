
function Playlist(props){
    const data= props.data;
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
            {data.map(item=>{

                return (
                    <li key={item.id} className={`${(item.id==currentItem? "active": "")} ${listClass}`}>
                        
                        <h3><a className="title" onClick={()=>setCurrentMedia(item.id)}>{item.title}</a></h3>
                        <span>{item.musicians}</span>
                    </li>
                )
            })}
            </ul>
            </div>
        </div>
    )
}
export default Playlist;