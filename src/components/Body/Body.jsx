import React, { useEffect } from 'react'
import { useDataLayerValue } from '../../DataLayer';
import Header from '../Header/Header';
import './Body.css';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from '../SongRow/SongRow';
import AlbumCard from '../AlbumCard/AlbumCard';

function Body({spotify}) {
    const [{ play, song, album, searchAlbums, searchTracks }, dispatch] = useDataLayerValue();

    const palyOrPauseSong = () => {
        if(song){
            dispatch({
                type: "SET_PLAY",
                play: false,
              });
        }
      }

      useEffect(() => {
          spotify.getAlbum('1qOIgEFmmJPbep8AR3He39').then((item) => {
            dispatch({
                type: "SET_ALBUM",
                album: item,
              });
          }).catch(err => {
              localStorage.clear();

              dispatch({
                type: "SET_TOKEN",
                token: null,
              });
          })
      }, [])
    
    return (
        <div className="body">
            <Header spotify={spotify}/>
            {searchAlbums?.length ? 
                (   <div className="searchData">
                        <h1 className="searchResultTitle">Albums</h1>

                        <div className="searchAlbums">
                            {searchAlbums?.map(
                                (item, index) => (
                                    <AlbumCard album={item} key={index} spotify={spotify}/>
                                )
                            )}
                        </div>

                        <br/>

                        <h1 className="searchResultTitle">Tracks</h1>
                        
                        <div className="searchTracks">
                            {searchTracks?.map(
                                (item, index) => (
                                    <SongRow track={item} key={index} index={index} setAlbum={true}/>
                                )
                            )}
                        </div>

                    </div>
                )
            :
                (
                    <div className="body__main">
                        <div className="body__info">
                        <img src={album?.images[0].url} alt="Album" />
                        <div className="body__infoText">
                            <strong>ALBUM</strong>
                            <h2>{album?.name}</h2>
                            <p className="body__infoDescription">
                                {album?.artists[0]?.name} <span className="dot">-</span> {album?.release_date.slice(0,4)} <span className="dot">-</span> {album?.total_tracks} songs </p>
                        </div>
                    </div>

                    <div className="body__songs">
                        <div className="body__icons">
                            {play ? <PauseCircleFilledIcon className="body__shuffle" onClick={palyOrPauseSong}/>
                                :
                                <PlayCircleFilledIcon className="body__shuffle" onClick={palyOrPauseSong}/>
                            }
                            
                            <FavoriteIcon fontSize="large"/>
                            <MoreHorizIcon/>
                        </div>

                        {album?.tracks?.items.map(
                            (item, index) => (
                                <SongRow track={item} key={index} index={index} setAlbum={false}/>
                            )
                        )}
                     </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default Body;
