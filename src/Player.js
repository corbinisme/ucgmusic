import YTplayer from "./YTplayer";
import Playlist from "./Playlist";
import AudioPlayer from "./AudioPlayer";

function Player(props){
    const data = props.list;
    const currentItem = props.currentItem;
    const currrentMediaObj = data.filter(item=> item.id == currentItem);
    const setCurrentMedia = props.setCurrentMedia;

    const onEnded = (event) => {
        console.log("media ended - go to next", event)
    }
    return (
        <div>
            Player

            <Playlist data={data} currentItem={currentItem} setCurrentMedia={setCurrentMedia} />
            <hr />

            <div className="btn-group">
                <button className="btn btn-secondary">Previous</button>
                <button className="btn btn-secondary">Next</button>
            </div>

            <div className='slider'>
                {currrentMediaObj && currrentMediaObj.map((item, index) => {

                let ytLink = item.video_link? item.video_link: null;
                if(ytLink){
                    ytLink = ytLink.split("watch?v=")[1];
                    // watch for trailing params
                    ytLink = ytLink.split("&")[0];
                }
                return (
                    <div key={index}>
                    <h2>{item.title}</h2>
                    <p>{item.musicians}</p>
                    {(item.image_link) ? <img src={item.image_link} alt={item.title} style={{width: "200px"}} /> : null}
                    <br />
                    {(item.music_link) ? <AudioPlayer
                        music_link={item.music_link}
                        autoPlay
                        controls
                        onEnded={onEnded}
                        /> : null}

                    
                    {(item.video_link) ? <YTplayer YTid={ytLink} onEnded={onEnded} /> : null}
                    </div>
                );
                })}
            </div>
        </div>
    )
}
export default Player;