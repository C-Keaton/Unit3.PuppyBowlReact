import { useState, useEffect } from 'react' 
import RenderAllPlayers from "./AllPlayers"
import RenderSinglePlayer from './SinglePlayer'
import './App.css'

function App() {
  const [playerList, setPlayerList] = useState([]);
  const [updateApp, setUpdateApp] = useState(false);
  const [currentID, setCurrentID] = useState(0);

  const [inputName, setInputName] = useState("");
  const [inputImageUrl, setInputImageUrl] = useState("");
  const [inputBreed, setInputBreed] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  const COHORT = "2402-FTB-ET-WEB-FT"
  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}/players/`

  const getPlayers = async() => {
    const response = await fetch(API_URL)
    const jsonFile = await response.json()
    const players = jsonFile.data.players
    setPlayerList(players)
    setUpdateApp(false)
    setCurrentID(0)
  }
  
  useEffect(() => {
    getPlayers()
  }, [])

  const addNewPlayer = (event) => {
    event.preventDefault()
    
    const name = inputName
    const imageUrl = inputImageUrl
    const breed = inputBreed
    const status = inputStatus

    //setPlayerList([...playerList, { name: inputName, breed: inputBreed,  status: inputStatus }])
    const postNewPlayer = async() => {
      try {
        const response = await fetch(API_URL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `${name}`,
              imageUrl: `${imageUrl}`,
              breed: `${breed}`,
              status: `${status}`,
            }),
          }
        );
        const result = await response.json();
        console.log(result);
        await getPlayers()
      } 
      catch (err) {
        console.error(err);
        await getPlayers()
      }
    }
    postNewPlayer()
  }

  return (
    <>
      <h1>Puppy Bowl</h1>

      <form id="form" onSubmit={addNewPlayer}>
        <h3>Create New Player</h3>

        <label>Name</label>
        <input type='text' onChange={(event) => setInputName(event.target.value)}></input><br></br>

        <label>ImageUrl</label>
        <input type='text' onChange={(event) => setInputImageUrl(event.target.value)}></input><br></br>

        <label>Breed</label>
        <input type='text' onChange={(event) => setInputBreed(event.target.value)}></input><br></br>

        <label>Status</label>
        <input type='text' onChange={(event) => setInputStatus(event.target.value)}></input><br></br>

        <button>Submit</button>
      </form>

      <h1>Players</h1>
      {(updateApp == false) ?
      <RenderAllPlayers playerList={playerList} setUpdateApp={setUpdateApp} setCurrentID={setCurrentID}/>
      : <RenderSinglePlayer setUpdateApp={setUpdateApp} currentID={currentID} setCurrentID={setCurrentID} API_URL={API_URL} getPlayers={getPlayers}/>}
    </>
  )
}

export default App

