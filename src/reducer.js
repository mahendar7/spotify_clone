export const initialState = {
  user: null,
  playlists: [],
  play: false,
  song: null,
  album: null,
  searchText: "",
  searchTracks: [],
  searchAlbums: [],
  token: localStorage.getItem("token"),
  prevOrNext: null,
  currentIndex: null,
  previousIndex: null,
  nextIndex: null,
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOKEN":
      localStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token,
      };

    case "SET_ALBUM":
      return {
        ...state,
        album: action.album,
      };

    case "SET_SONG":
      state.currentIndex = action.song.index;
      state.previousIndex = action.song.index - 1;
      state.nextIndex = action.song.index + 1;

      return {
        ...state,
        song: action.song.track,
      };

    case "SET_PLAY":
      return {
        ...state,
        play: !state.play,
      };

    case "SET_SEARCHTEXT":
      return {
        ...state,
        searchText: action.searchText,
      };

    case "SET_SEARCHTRACKS":
      return {
        ...state,
        searchTracks: action.searchTracks,
      };

    case "SET_SEARCHALBUMS":
      return {
        ...state,
        searchAlbums: action.searchAlbums,
      };

    case "SET_NEXTORPREV":
      let album = state.album.tracks.items;
      console.log("prev", state.previousIndex);
      console.log("current", state.currentIndex);
      console.log("next", state.nextIndex);

      if (action.prevOrNext === "prev") {
        if (state.previousIndex >= 0) {
          state.song = album[state.previousIndex];

          state.currentIndex = state.previousIndex;
          state.previousIndex = state.currentIndex - 1;
          state.nextIndex = state.currentIndex + 1;
        }
      } else {
        if (state.nextIndex < album.length) {
          state.song = album[state.nextIndex];

          state.currentIndex = state.previousIndex + 1;
          state.previousIndex = state.currentIndex;
          state.nextIndex = state.currentIndex + 1;
        }
      }

      return {
        ...state,
        prevOrNext: null,
      };

    default:
      return state;
  }
};

export default reducer;
