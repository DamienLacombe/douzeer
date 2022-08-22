import {useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import Slider from "./components/Slider";
import Lecteur from "./components/Lecteur";
import "./css/reset.css"
import "./css/app.css"
import Background from "./components/Background";


function App() {

    const [songs, setSongs] = useState();
    const [songInfo, setSongInfo] = useState();
    const [nbrSlide, setNbrSlide] = useState(0);
    const [changeByReader, setChangeByReader] = useState(false)
    const [chargedLecteur, setChargedLecteur] = useState(false)

    useEffect(() => {
      const nav = document.querySelector("nav")
      nav?.classList.add("charged")
    }, [songs]) 

    return (
      <div className="App">
        <header className="App-header">
            <Searchbar setSongs={setSongs} setNbrSlide={setNbrSlide}/>
            {songs !== undefined && <Slider songs={songs} setSongInfo={setSongInfo} nbrSlide={nbrSlide} setNbrSlide={setNbrSlide} changeByReader={changeByReader} setChangeByReader={setChangeByReader} setChargedLecteur={setChargedLecteur}/> }
        </header>
        <main>
            {
              chargedLecteur ? (
                <>
                  <Background/>
                  <Lecteur songInfo={songInfo} setSongInfo={setSongInfo} nbrSlide={nbrSlide} setNbrSlide={setNbrSlide} setChangeByReader={setChangeByReader}/>
                </>  
              ) : (
                <p className="message">C'est vide ? <br />Cherche une musique !</p>
              )
            }
        </main>
      </div>
    );
}

export default App;
