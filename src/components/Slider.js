import React, { useEffect, useState } from 'react'
import Song from './Song'
import { slide, removeActiveItem } from '../utils/sliderFunction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Slider = ({songs, setSongInfo, nbrSlide, setNbrSlide, changeByReader, setChangeByReader, setChargedLecteur}) => {

    useEffect(() => {
        removeActiveItem()
    }, [songs])

    useEffect(() => {
        slide(nbrSlide)
    }, [nbrSlide])
  
  useEffect(() => {
    const li = document.querySelectorAll(".slider ul li");
    
      if (window.innerWidth < 640) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth  + "px"
          }) 
      } else if (window.innerWidth > 640 && window.innerWidth < 960) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 2 + "px"
          })
      } else if (window.innerWidth > 960 && window.innerWidth <= 1280) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 3 + "px"
          })
      } else if (window.innerWidth >= 1280 && window.innerWidth < 1600 ) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 3 + "px"
          })
      } else if (window.innerWidth > 1600){
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 4 + "px"
          })
      }
      slide(nbrSlide);
  }, [])

  window.addEventListener("resize" , () => {
      const li = document.querySelectorAll(".slider ul li");

      if (window.innerWidth < 640) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth  + "px"
          }) 
      } else if (window.innerWidth > 640 && window.innerWidth < 960) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 2 + "px"
          })
      } else if (window.innerWidth > 960 && window.innerWidth < 1280) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 3 + "px"
          })
      } else if (window.innerWidth > 1280 && window.innerWidth < 1600 ) {
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 3 + "px"
          })
      } else if (window.innerWidth > 1600){
          li.forEach(li => {
              li.style.minWidth = window.innerWidth / 4 + "px"
          })
      }
     slide(nbrSlide);
  })

  return (
    
    <nav className='slider'>
        {nbrSlide > 0 && <FontAwesomeIcon className='arrowleft' icon={faArrowLeft} onClick={() => {
            setChangeByReader(false)
            setNbrSlide(nbrSlide - 1)}  
        }/>} 
        <ul className='tanslate'>
        {
            songs?.map((song, index) => {
                return <Song key={index} index={index} nbrSlide={nbrSlide} songInfo={song} setSongInfo={setSongInfo} changeByReader={changeByReader} setChangeByReader={setChangeByReader} setChargedLecteur={setChargedLecteur}/>
            })
        }
        </ul>
        {nbrSlide < 25 && <FontAwesomeIcon className='arrowright' icon={faArrowRight} onClick={() => {
            setChangeByReader(false)
            setNbrSlide(nbrSlide + 1)}
        }/>}
    </nav>
  )
}

export default Slider