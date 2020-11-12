import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { useDataLayerValue } from "../../../DataLayer";

function Search({ spotify }) {
  // const [searchText, setSearchText] = useState("");
  const [searchAlbums, setSearchAlbums] = useState(null);
  const [searchTracks, setSearchTracks] = useState(null);
  const [{ searchText }, dispatch] = useDataLayerValue();

  const search = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_SEARCHTEXT",
      searchText: e.target.value,
    });

    if (searchText.length) {
      if (searchAlbums) {
        clearTimeout(searchAlbums);
      }

      setSearchAlbums(
        setTimeout(() => {
          spotify
            .searchAlbums(searchText)
            .then((albums) => {
              dispatch({
                type: "SET_SEARCHALBUMS",
                searchAlbums: albums.albums.items,
              });
            })
            .catch((err) => {
              localStorage.clear();

              dispatch({
                type: "SET_TOKEN",
                token: null,
              });
            });
        }, 300)
      );

      if (searchTracks) {
        clearTimeout(searchTracks);
      }

      setSearchTracks(
        setTimeout(() => {
          spotify
            .searchTracks(searchText)
            .then((tracks) => {
              console.log(tracks);

              dispatch({
                type: "SET_SEARCHTRACKS",
                searchTracks: tracks.tracks.items,
              });
            })
            .catch((err) => {
              localStorage.clear();

              dispatch({
                type: "SET_TOKEN",
                token: null,
              });
            });
        }, 400)
      );
    }
  };
  return (
    <div className="search">
      <SearchIcon />
      <input
        type="text"
        onChange={(e) => {
          search(e);
        }}
        value={searchText}
        placeholder="Search for Artists, Songs, Movies"
      />
      {searchText ? (
        <ClearIcon
          onClick={() => {
            dispatch({
              type: "SET_SEARCHTEXT",
              searchText: "",
            });
            dispatch({
              type: "SET_SEARCHALBUMS",
              searchAlbums: [],
            });
            dispatch({
              type: "SET_SEARCHTRACKS",
              searchTracks: [],
            });
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Search;
