
function Controls(props){
    const goToNextSong = props.goToNextSong;
    const togglePause = props.togglePause;
    const isPaused = props.isPaused;
    return(
        <div className="btn-group">
            <button className="btn btn-secondary" onClick={()=>goToNextSong(-1)}>Previous</button>
            <button className="btn btn-secondary" onClick={()=>togglePause()}>{(isPaused? "Play": "Pause")}</button>
            <button className="btn btn-secondary" onClick={()=>goToNextSong(1)}>Next</button>
        </div>
    )
}
export default Controls;