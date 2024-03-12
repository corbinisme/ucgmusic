
function Playlist(props){
    const data= props.data;
    const currentItem = props.currentItem;
    const setCurrentMedia = props.setCurrentMedia;
    return (
        <div>
            Playlist
            <ul>
            {data.map(item=>{

                return (
                    <li key={item.id} className={(item.id==currentItem? "active": "")}>
                        
                        <span className="title" onClick={()=>setCurrentMedia(item.id)}>{item.title}</span>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}
export default Playlist;