import ReactAudioPlayer from 'react-audio-player';
import { useEffect, useState } from 'react';

function AudioPlayer(props){

    const audioRef=props.audioRef;
    const music_link = props.music_link;
    const onEnded = props.onEnded;
    const isPaused = props.isPaused;
    const updatePercentage = props.updatePercentage;
    const [currentPercentage, setCurrentPercentage] = useState(0);
    
    function handleTimeUpdate() {
        // This function will be called whenever the time updates

        const totalLength =  audioRef.current?audioRef.current.duration: 0;
        const currentTime = audioRef.current? audioRef.current.currentTime: 0;
        const currentPercentage = (currentTime / totalLength) * 100;

        setCurrentPercentage(currentPercentage);
        updatePercentage(currentPercentage);
    }

    useEffect(() => {
        if (isPaused) {
            audioRef.current.pause();
         
        } else {
            audioRef.current.play();
        }
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      }, [isPaused]);

    return (<div className="audio_player">
       
        <figure className='text-center album_art'>
            <img src="https://via.placeholder.com/300" alt="album cover" />
        </figure>
        <audio ref={audioRef} 
            src={music_link}
            autoPlay
            
            onEnded={onEnded}
         />
         
        
        </div>)

}
export default AudioPlayer