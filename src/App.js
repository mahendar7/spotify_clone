import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player";
import { useDataLayerValue } from "./DataLayer";

var spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      setUser(_token);
    } else if (token) {
      setUser(token);
    }
  }, []);

  const setUser = (__token) => {
    dispatch({
      type: "SET_TOKEN",
      token: __token,
    });

    spotify.setAccessToken(__token);
    spotify
      .getMe()
      .then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      })
      .catch((err) => {
        localStorage.clear();

        dispatch({
          type: "SET_TOKEN",
          token: null,
        });
      });
  };

  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
