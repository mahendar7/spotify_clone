import React from 'react'
import SidebarOption from '../SidebarOption/SidebarOption';
import './Sidebar.css';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDataLayerValue } from '../../DataLayer';

function Sidebar() {
    const [ {playlists},dispatch] = useDataLayerValue();

    return (
        <div className="sidebar">
            <img
                className="sidebar__logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="logo"
            />

            <SidebarOption Icon={HomeIcon} title="Home" />
            <SidebarOption Icon={SearchIcon} title="Search" />
            <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
            
            <br />

            <strong className="sidebar__title">PLAYLISTS</strong>
            
            <hr />

            <SidebarOption Icon={AddIcon} title="Create PlayList" />
            <SidebarOption Icon={FavoriteIcon} title="Liked Songs" />

            {playlists?.items?.map((playlist) => (
                <SidebarOption option={playlist.name} />
            ))}
        </div>
    )
}

export default Sidebar
