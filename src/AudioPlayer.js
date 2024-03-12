import ReactAudioPlayer from 'react-audio-player';
function AudioPlayer(props){
    const music_link = props.music_link;
    const onEnded = props.onEnded;

    return (<ReactAudioPlayer
        src={music_link}
        autoPlay
        controls
        onEnded={onEnded}
        />)

}
export default AudioPlayer