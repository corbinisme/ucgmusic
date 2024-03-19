import ReactAudioPlayer from 'react-audio-player';
import { useEffect } from 'react';

function AudioPlayer(props){

    const audioRef=props.audioRef;
    const music_link = props.music_link;
    const onEnded = props.onEnded;
    const isPaused = props.isPaused;

    useEffect(() => {
        if (isPaused) {
            audioRef.current.pause();
         
        } else {
            audioRef.current.play();
        }
      }, [isPaused]);

    return (<div>
        {isPaused? "Paused": "Playing"}
        <audio ref={audioRef} 
            src={music_link}
            autoPlay
            
            onEnded={onEnded}
         />
        
        </div>)

}
export default AudioPlayer