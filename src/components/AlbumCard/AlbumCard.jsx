import React, { useEffect } from 'react'
import './AlbumCard.css'
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleFilled";
import { useDataLayerValue } from '../../DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';
var spotify = new SpotifyWebApi();

function AlbumCard({album}) {
    const [{token}, dispatch] = useDataLayerValue();

    const setAlbum = () => {
        spotify.getAlbum(album.id).then((item) => {
            dispatch({
                type: "SET_ALBUM",
                album: item,
              });

            dispatch({
                type: "SET_SEARCHALBUMS",
                searchAlbums: [],
              });
            
            dispatch({
            type: "SET_SEARCHTEXT",
            searchText: '',
            });
          }).catch(err => {
              localStorage.clear();

              dispatch({
                type: "SET_TOKEN",
                token: null,
              });
          })
    }

    useEffect(() => {
        spotify.setAccessToken(token);
    }, [])


    return (
        <div className="albumCard" onClick={setAlbum}>
            <img src={album?.images[0]?.url} alt={album.name}/>
            
            <PlayCircleOutlineIcon className="album__playIcon"/>
            <div className="album__info">
                <p className="album__title">{album.name.slice(0,15)} { album.name.length>15 ? '...' : ''}</p>
                <p className="album__artist">{album.artists[0].name}</p>
            </div>
        <br/>
        </div>
    )
}

export default AlbumCard
