import React, { useState } from 'react'
import { getSongs } from '../utils/apiFunction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Searchbar = ({setSongs}) => {

    const [title, setTitle] = useState("")

    function searchSongs(e) {
        const url = `https://api.deezer.com/search?q=${title}`;

        e.preventDefault()
        getSongs(url)
        .then(songs => setSongs(songs.data))
    }


    return (
        <form action="" onSubmit={(e) => searchSongs(e)}>
            <div>
                <input onChange={(e) => setTitle(e.target.value)} type="text" />
                <button type='submit' onClick={() => {
                    const nav = document.querySelector("nav")
                    nav?.classList.add("charged")
                }}><FontAwesomeIcon icon={faSearch}/></button>
            </div>
        </form>
    )
}

export default Searchbar