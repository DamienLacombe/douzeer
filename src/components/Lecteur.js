import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faVolumeOff, faVolumeUp, faVolumeTimes, faAngleDoubleLeft, faAngleDoubleRight, faPause, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useState } from 'react'
import { resetActiveItem} from '../utils/sliderFunction'
import { volumeChange } from '../utils/lecteurFunction'

const Lecteur = ({songInfo, nbrSlide, setNbrSlide, setChangeByReader}) => {

    const [pause, setPause ] = useState(false)
    const [mute, setMute] = useState(false)
    const [volume, setVolume] = useState(100)
    const [volumeBeforeMute, setVolumeBeforeMute] = useState(0)
    const [songDuration, setSongDuration] = useState(0)
    const [songCurrentTime, setSongCurrentTime] = useState(0) 
    const [timeLeft, setTimeLeft] = useState(0)
    const [timeValue, setTimeValue] = useState(0)
       
    useEffect(() => {
        setTimeout(() => {
            
            document.querySelector(".info")?.classList.add("translate")
            document.querySelector(".system")?.classList.add("translate")
           const bars =  document.querySelectorAll(".bar");
           bars.forEach(bar => {
                bar.classList.add("animate")
           })
        }, 1);
        setTimeout(() => {
           const bars =  document.querySelectorAll(".bar");
           bars.forEach(bar => {
                bar.classList.add("animate")
           })
        }, 300);

    }, [])

    useEffect(() => {
        const song = document.querySelector("audio")
        songInfo !== undefined && setNbrSlide(parseInt(document.querySelector("li .active")?.getAttribute("data-index")))
         // a enlever si le slide au clic gêne
        setTimeValue(0)
        setPause(false)
        
        song.onloadedmetadata = () => {setSongDuration(parseInt(song.duration.toFixed()))}
        song.play()
        const bars =  document.querySelectorAll(".animate");
            bars.forEach(bar => {
                    bar.style.animationPlayState = "running"
            })
               
    }, [songInfo])  

    useEffect(() => {
        const song = document.querySelector("audio");
        
        song.addEventListener("timeupdate", () => {
            const song = document.querySelector("audio")
            setSongCurrentTime(parseInt(song?.currentTime.toFixed()));
            
        })
        song.addEventListener("ended", () => {
            setTimeValue(0)
            document.querySelector(".song-bar progress").value = 0
            const bars =  document.querySelectorAll(".animate");
            bars.forEach(bar => {
                    bar.style.animationPlayState = "paused"
            })
        })
        
    }, [songDuration])
    
    useEffect(() => {
        const song = document.querySelector("audio")
        if (songCurrentTime !== undefined) {
            
            const value = Math.round((100 / songDuration) * 100) / 100;
            
            setTimeLeft(songDuration - songCurrentTime)
            if (songDuration !== 0 && !song.paused ) {
                setTimeValue(timeValue + value)
            }
        }
    }, [songCurrentTime])


    
    

  return (
    <div className='lecteur'>
        <audio src={songInfo?.preview}></audio>
        <div className='info'>
            <img src={songInfo?.album?.cover_big} alt="" />
            <div className='title'>
                <h3>{songInfo?.artist?.name}</h3>
                <h3>{songInfo?.title}</h3>
            </div>
            
            <div className='song-bar'  >
                <input type="range" min={0} max={100}  value={timeValue} onInput={(e) => {
                    const song =  document.querySelector("audio")
                    setTimeValue( e.target.value / (100 / songDuration) * 3.23)
                    song.currentTime =  e.target.value / (100 / songDuration); 
                    volumeChange(e, document.querySelector(".song-bar progress"))
                }}/>
                <progress min={0} max={100} value={timeValue}/>
            </div>
            <p className='time-left'>{timeLeft}</p>
        </div>
        <div className='system'>
            <a href={songInfo?.link} target="_blank" rel="noopener noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Deezer_logo.svg" alt="" /></a>
            
            <div className='player'>
                <div className='main-player'>
                    <div className='icone-container'>

                        <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={() => {
                            const currentSong = document.querySelector(".active") 
                            setChangeByReader(true)
                            if (nbrSlide > 0) {
                                
                                resetActiveItem(document.querySelector(`[data-index = "${parseInt(currentSong?.getAttribute("data-index")) - 1}"]`))
                                setNbrSlide(nbrSlide - 1)
                            }
                            
                        }}/>
                    </div>
                    <div className='icone-container'>
                    {
                        pause ? (
                            <FontAwesomeIcon icon={faPlay} onClick={() => {
                                document.querySelector("audio").play()
                                setPause(!pause)
                                const bars =  document.querySelectorAll(".animate");
                                bars.forEach(bar => {
                                        bar.style.animationPlayState = "running"
                                })
                            } }/>
                            ) : (
                                <FontAwesomeIcon className='pause' icon={faPause} onClick={() => {
                                document.querySelector("audio").pause()
                                setPause(!pause)
                                const bars =  document.querySelectorAll(".bar ");
                                bars.forEach(bar => {
                                        
                                        bar.style.animationPlayState ="paused "
                                })
                            }}/>
                        ) 
                    }

                    </div>
                    <div className='icone-container'>

                        <FontAwesomeIcon icon={faAngleDoubleRight} onClick={() => {
                            const currentSong = document.querySelector(".active") 
                            setChangeByReader(true)
                            if (nbrSlide <= 25) {
                                
                                resetActiveItem(document.querySelector(`[data-index = "${parseInt(currentSong?.getAttribute("data-index")) + 1}"]`))
                                setNbrSlide(nbrSlide + 1)
                            }
                        }}/>
                    </div>
                </div>
                <div className='volume-container'>
                {
                    mute ? (
                        <FontAwesomeIcon icon={faVolumeTimes} onClick={() => {
                            setMute(!mute);
                            document.querySelector("audio").volume = volumeBeforeMute / 100;
                            setVolume(volumeBeforeMute)
                            document.querySelector(".volume-bar input").value = volumeBeforeMute;
                            setVolumeBeforeMute()
                        }}/>
                    ) : (
                        volume <= 1 ? (
                            <FontAwesomeIcon icon={faVolumeOff}/>
                            ) : (
                            <FontAwesomeIcon icon={faVolumeUp} onClick={() => {
                                setMute(!mute);
                                setVolumeBeforeMute(volume);
                                setVolume(0);
                                document.querySelector(".volume-bar input").value = 0;
                                document.querySelector("audio").volume = 0;
                            }}/>
                        )
                        
                    )
                }    
                    <div className='volume-bar'>
                        <input type="range" min={0} max={100} value={volume} onInput={(e) => {
                            volumeChange(e, document.querySelector(".volume-bar progress"))
                            setVolume(e.target.value)
                            document.querySelector("audio").volume = volume / 100;
                        }}/> 
                        <progress min={0} max={100} value={volume}/>   
                    </div>
              
                </div>
            </div>
        </div>        
    </div>
  )
}

export default Lecteur