import YTplayer from "./YTplayer";
import Playlist from "./Playlist";
import AudioPlayer from "./AudioPlayer";
import Controls from "./Controls";
import React, { useState, useRef } from "react";

function Player(props){
    const data = props.list;
    const currentItem = props.currentItem;
    const currrentMediaObj = data.filter(item=> item.id == currentItem);
    const setCurrentMedia = props.setCurrentMedia;
    const [isPaused, setIsPaused] = useState(false);

    const audioRef = useRef();

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
    

    const onEnded = (event) => {

        // go to next song
        //console.log("onEnded", event);
        goToNextSong(1);
        
    }
    const pauseMedia = () => {
        console.log("pauseMedia");
    }
    const playMedia = () => {
        console.log("playMedia");
    }

    const togglePause = () => {
        console.log("togglePause");
        setIsPaused(!isPaused);
    };
    return (
        <div>
            Player

            <Playlist data={data} currentItem={currentItem} setCurrentMedia={setCurrentMedia} />
            <hr />

            <Controls goToNextSong={goToNextSong} togglePause={togglePause} isPaused={isPaused} audioRef={audioRef} />
            

            <div className='slider'>
                {(currrentMediaObj? currrentMediaObj.map((item, index) => {
                    console.log("item", item);
                let ytLink = item.video_link? item.video_link: null;
                if(ytLink){
                    ytLink = ytLink.split("watch?v=")[1];
                    // watch for trailing params
                    ytLink = ytLink.split("&")[0];
                }
                return (
                    <div key={index} className="mediaWrapper">
                        <h2>{item.title}</h2>
                        <p>{item.musicians}</p>
                        <p>composer</p>
                        
                        {(item.music_link) ? <AudioPlayer
                            music_link={item.music_link}
                            audioRef={audioRef}
                            isPaused={isPaused}
                            onEnded={onEnded}
                            /> : null}

                        {(item.video_link) ? <YTplayer YTid={ytLink} onEnded={onEnded} isPaused={isPaused} /> : null}

                        <div className="lyrics">
                                Lyrics
                            <div dangerouslySetInnerHTML={{__html: item.lyrics? item.lyrics: ""}}></div>
                        </div>
                    </div>
                );
                }): "loading...")}
            </div>
        </div>
    )
}
export default Player;