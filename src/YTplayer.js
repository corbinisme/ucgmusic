
import YouTube from 'react-youtube';

const onReady = (event) => {
    console.log("ready", event)
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
}


function YTplayer(props) {
    const YTid = props.YTid;
    const onEnded=props.onEnded;
    const opts = {
        height: '390',
        width: '640',
        enablejsapi: true,
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };
  
    /*
    <YouTube
  videoId={string}                  // defaults -> ''
  id={string}                       // defaults -> ''
  className={string}                // defaults -> ''
  iframeClassName={string}          // defaults -> ''
  style={object}                    // defaults -> {}
  title={string}                    // defaults -> ''
  loading={string}                  // defaults -> undefined
  opts={obj}                        // defaults -> {}
  onReady={func}                    // defaults -> noop
  onPlay={func}                     // defaults -> noop
  onPause={func}                    // defaults -> noop
  onEnd={func}                      // defaults -> noop
  onError={func}                    // defaults -> noop
  onStateChange={func}              // defaults -> noop
  onPlaybackRateChange={func}       // defaults -> noop
  onPlaybackQualityChange={func}    // defaults -> noop
/>
*/
    
      return <YouTube 
        videoId={YTid} 
        opts={opts} 
        onEnd={onEnded}
        onReady={onReady} 
      />;
    

}
export default YTplayer;