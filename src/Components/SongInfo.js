
function SongInfo(props){
    const item = props.currrentMediaObj?props.currrentMediaObj[0]:null;
  
    const lyrics = item? item.lyrics: '';
    return (
        <div className="song_meta col">
            <h3>Info</h3>
            <div className="bottom_scroll">
                <p>composer</p>
                
                <div dangerouslySetInnerHTML={{__html: lyrics}}></div>
            </div>
        </div>
    )
}
export default SongInfo;