import React from 'react'

import { useEffect } from 'react'
import { resetActiveItem, secondsToMinutes } from '../utils/sliderFunction'


const Song = ({songInfo, setSongInfo, index, nbrSlide, changeByReader, setChargedLecteur}) => {
    
    useEffect(() => {
        console.log(((songInfo.duration / 60).toString().slice(2, 4) / 100 * 60).toFixed(0)) 
    }, [])
    useEffect(() => {
               
        if (index === nbrSlide && changeByReader === true) {
            setSongInfo(songInfo)
    
        }
    }, [nbrSlide])

    return (
        <li>
            <div data-index={index}  className='song-card' onClick={(e) => {
                resetActiveItem(e.currentTarget)
                setSongInfo(songInfo)
                setChargedLecteur(true)
            }}>
                <div className='album-cover'>
                    <img src={songInfo.album.cover} alt="album-cover" />
                </div>
                <div className='song-info'>
                    <div className='song-header'>
                        <h2>{songInfo.title}</h2>
                        <h2>par {songInfo.artist.name}</h2>
                    </div>
                    <p>{secondsToMinutes(songInfo.duration)}</p>
                </div>

            </div>
        </li>
    )
}

export default Song