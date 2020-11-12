import React from 'react'
import { useDataLayerValue } from '../../DataLayer';
import './SongRow.css'
import cx from 'classnames';

function SongRow({track, index, setAlbum}) {
    const [{song}, dispatch] = useDataLayerValue();
    
    const selectSong = () => {
        if(setAlbum){
            
        let _album = track?.album;
        console.log(_album);
        _album['tracks']={
            items:[track]
        }
        console.log(_album);
        
            dispatch({
                type: "SET_ALBUM",
                // album: track.album,
                album: _album,
              });
        }
        
        dispatch({
            type: "SET_SONG",
            song: {track:track, index:index},
          });
        
          dispatch({
            type: "SET_PLAY",
            play: false,
          });
    }

    return (
        <div className={cx('songRow', {'selected': song?.id === track?.id})}
        onClick={selectSong}>
            {setAlbum ? 
                <img src={track?.album.images[0].url} className="songRow__album" alt=""/> 
                :
                <p>{index+1}</p>
             }
            
            <div className="songRow__info">
                <h1>{track?.name}</h1>
                <p>
                    {track?.artists.map((artist) => artist.name).join(", ")}
                </p>
            </div>            
            
        </div>
    )
}

export default SongRow
