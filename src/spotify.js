// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";

let WindowUrlSegments = window.location.href.split("//")[1].slice(0, 7);
let redirectUri = "";

if (WindowUrlSegments === "spotify") {
  redirectUri = "https://spotify-clone-9462f.web.app/";
} else {
  redirectUri = "http://localhost:3000/";
}

console.log(redirectUri);

const clientId = "101fdb24e7714732b4f75894bd87fe20";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
