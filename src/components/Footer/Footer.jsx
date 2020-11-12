import React, { useEffect, useState } from 'react'
import './Footer.css';

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from '@material-ui/core';
import { useDataLayerValue } from '../../DataLayer';



function Footer() {
    const [{album, song, play}, dispatch] = useDataLayerValue();
    const [volume, setVolume] = useState(1);
          
      useEffect(() => {
        let _audio = document.getElementById("audio");
          if(play){
            if(_audio){_audio.play()}
          }else{
            if(_audio){_audio.pause()}
          }
        
      }, [play])

      useEffect(() => {
        palyOrPauseSong();
      }, [song])

      const palyOrPauseSong = () => {
        dispatch({
            type: "SET_PLAY",
            play: false,
          });
      }

      const prevOrNext = (e,value) => {
          e.preventDefault();
            dispatch({
                type: "SET_PLAY",
                play: false,
            });
            dispatch({
                type: "SET_NEXTORPREV",
                prevOrNext: value,
            });
      }

    const handleVolumeChange = (event, volume) => {
        setVolume(volume);
        document.getElementById('audio').volume = volume;
      };

    return (
        (song ? 
        <div className="footer">
            <audio src={song?.preview_url} id="audio" />

            <div className="footer__left">
                <img src={album?.images[0].url}
                    alt="" className="footer__albumLogo"/>

                <div className="footer__songInfo">
                    <h4>{song?.name}</h4>
                    <p>{song?.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
                
            </div>
            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon title="Previous" onClick={(e) => prevOrNext(e,'prev')} className="footer__icon" />
                {
                    play ?
                    <PauseCircleOutlineIcon fontSize="large" className="footer__green"
                    onClick={palyOrPauseSong}/>
                    :
                    <PlayCircleOutlineIcon fontSize="large" className="footer__green"
                    onClick={palyOrPauseSong}/>
                }
                <SkipNextIcon title="Next" onClick={(e) => prevOrNext(e,'next')} className="footer__icon"/>
                <RepeatIcon className="footer__green"/>
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon className="footer__icon"/>
                    </Grid>
                    <Grid item>
                        {   volume === 0 ? 
                            (<VolumeOffIcon className="footer__icon"/>)
                            :
                            (<VolumeDownIcon className="footer__icon"/>)
                        }
                    </Grid>
                    <Grid item xs>
                        <Slider
                            defaultValue={volume}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            step={0.1}
                            min={0}
                            max={1.0}
                            onChange={handleVolumeChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </div> : ''
        )
    )
}

export default Footer
