import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';



window['ytTimer'] = null; 

function YTplayer(props) {

  const updatePercentage = props.updatePercentage;
  const [duration, setDuration] = useState(0);
  const videoRef = props.videoRef;

  const onReady = (event) => {

    // access to player in all event handlers via event.target
    window['cElement'] = event;
    event.target.pauseVideo();
    videoRef.current = event.target;
  }

  const checkVideoTime = (event) => {
    if(window['cElement'] && window['cElement'].target &&  window['cElement'].target.h!=null){

        let currentTime = window['cElement'].target.getCurrentTime();
        //get percentage
        const percentage = (currentTime / window['cElement'].target.getDuration()) * 100;

        updatePercentage(percentage);
    
    }
  }


  useEffect(() => {
    if (window['cElement'] && window['cElement'].target &&  window['cElement'].target.h!=null) {

      props.isPaused
        ? window['cElement'].target.pauseVideo()
        : window['cElement'].target.playVideo();
       
      const timer = window['cElement'].target.getCurrentTime();
      const totalLength = window['cElement'].target.getDuration();
      videoRef.current = window['cElement'].target;
      
     
      setDuration(totalLength);
      if(props.isPaused){

        window.clearInterval(window['ytTimer']);
      } else {
        window['ytTimer'] = window.setInterval(checkVideoTime, 1000);
      }
      
      
    } else {
      console.log("no cElement")
    }
  }, [props.isPaused, window['cElement']]);

  const YTid = props.YTid;
  const onEnded=props.onEnded;
  const opts = {
      height: '390',
      width: '640',
      enablejsapi: true,

      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        rel: 0,
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
    
      return <div><YouTube 
        videoId={YTid} 
        opts={opts} 
        onEnd={onEnded}
        onTimeUpdate={checkVideoTime}
        onReady={onReady} 
        onStateChange={checkVideoTime}
      /></div>;
    

}
export default YTplayer;