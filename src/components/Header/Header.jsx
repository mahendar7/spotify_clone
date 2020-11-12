import React from 'react'
import './Header.css'
import { Avatar } from '@material-ui/core';
import { useDataLayerValue } from '../../DataLayer';
import Search from '../SongRow/Search/Search';

function Header({spotify}) {
    const [ {user}, dispatch] = useDataLayerValue();

    return (
        <div className="header">
            <div className="header__left">
                <Search spotify={spotify}/>
            </div>
            <div className="header__right">
                <Avatar src="{user?.images[0]?.url" alt={user?.display_name} className="avatar"/>
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header
