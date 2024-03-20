
import {useState, useEffect} from 'react';
import PlayIcon from './PlayIcon';
import PauseIcon from './PauseIcon';
import ForwardIcon from './ForwardIcon';
function Controls(props){
    const goToNextSong = props.goToNextSong;
    const togglePause = props.togglePause;
    const isPaused = props.isPaused;
    const currentPercentage = props.currentPercentage;
    
  

    return(
        <div>
        <div className="d-flex controls_wrapper w-100">
            <a href="#">Shuffle</a>
            <button className="btn btn-secondary small_icon reverse_icon" onClick={()=>goToNextSong(-1)}>
                <ForwardIcon />
            </button>
            <button className="btn btn-secondary" onClick={()=>togglePause()}>
                {(isPaused? <PlayIcon />: <PauseIcon />)}
            </button>
            <button className="btn btn-secondary small_icon" onClick={()=>goToNextSong(1)}>
                <ForwardIcon />
            </button>
            <a  href="#">info</a>
        </div>
        <div className="progress">
            <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: currentPercentage + "%"}} aria-valuenow={currentPercentage} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        </div>
    )
}
export default Controls;