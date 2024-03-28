import YTplayer from "./YTplayer";
import Playlist from "./Playlist";
import AudioPlayer from "./AudioPlayer";
import Controls from "./Controls";
import SongInfo from "./SongInfo";
import React, { useState, useRef, useEffect } from "react";

function Player(props){
    const data = props.list;
    const includes = props.includes;
    const currentItem = props.currentItem;
    const currrentMediaObj = data.filter(item=> item.id == currentItem);
    const setCurrentMedia = props.setCurrentMedia;
    const [isPaused, setIsPaused] = useState(false);
    const [currentPercentage, setCurrentPercentage] = useState(59);
    const [showInfo, setShowInfo] = useState(true);
    const [showPlaylist, setShowPlaylist] = useState(true);

    const audioRef = useRef();
    const videoRef = useRef();

    const goToNextSong = (dir) => {
        let currentIndex = data.findIndex(item=> item.id == currentItem);
        let nextIndex = currentIndex+dir;
        if(nextIndex >= data.length){
            nextIndex = 0;
        }
        if(nextIndex < 0){
            nextIndex = data.length-1;
        }
        setIsPaused(false);
        if(data[nextIndex].id){
            setCurrentMedia(data[nextIndex].id);
        }
        
    }

    const toggleInfo = () => {

        setShowInfo(!showInfo);
    }

    const updatePercentage = (percentage) => {
        setCurrentPercentage(percentage);
    }
    

    const onEnded = (event) => {

        // go to next song
        //console.log("onEnded", event);
        goToNextSong(1);
        
    }



    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    const playerModalClass= (currentItem!="" && currentItem!=null)? "open": "closed";
    return (
        <div className={`inner_wrapper player_modal ${playerModalClass}`}>
            <div className="inner_modal">

                <button className="close_modal btn btn-outline-primary" onClick={()=>setCurrentMedia(null)}>X</button>
              
                <div className='media_meta'>
                    {(currrentMediaObj? currrentMediaObj.map((item, index) => {

                        let ytLink = item.video_link? item.video_link: null;
                        if(ytLink){
                            ytLink = ytLink.split("watch?v=")[1];
                            // watch for trailing params
                            ytLink = ytLink.split("&")[0];
                        }
                        return (
                            <div key={index} className="mediaWrapper">
                                <header className='text-center'>
                                <h2 className="m-0">{item.title}</h2>
                                <p>{item.musicians}</p>
                                </header>
                                
                                <div className="player_wrapper">
                                
                                    {(item.music_link) ? <AudioPlayer
                                        music_link={item.music_link}
                                        audioRef={audioRef}
                                        isPaused={isPaused}
                                        updatePercentage={updatePercentage}
                                        onEnded={onEnded}
                                        /> : null}

                                    {(item.video_link) ? <YTplayer 
                                        YTid={ytLink} 
                                        videoRef={videoRef}
                                        updatePercentage={updatePercentage}
                                        onEnded={onEnded} 
                                        isPaused={isPaused} /> : null}
                                </div>
                                
                            </div>
                        );
                    }): "loading...")}
                </div>
               
            
            <Controls toggleInfo={toggleInfo} showInfo={showInfo} goToNextSong={goToNextSong} currentPercentage={currentPercentage} updatePercentage={updatePercentage} togglePause={togglePause} isPaused={isPaused} />
            
            <div className="bottom row mt-4">

                
                {showInfo&&<SongInfo currrentMediaObj={currrentMediaObj} />}
                {showPlaylist&&<Playlist type="modal" data={data} currentItem={currentItem} setCurrentMedia={setCurrentMedia} includes={includes} />}
               
            </div>
            </div>
             
            
        </div>
    )
}
export default Player;