import { useEffect, useState } from "react";

const RenderSinglePlayer = ({setUpdateApp, currentID, setCurrentID, API_URL, getPlayers}) => {
  const [currentPlayer, setCurrentPlayer] = useState(false);
  
  useEffect(() => {
    const getOnePlayer = async() => {
      const response = await fetch(`${API_URL}${currentID}`)
      const jsonFile = await response.json()
      const player = jsonFile.data.player
      setCurrentPlayer(player)
    }
    getOnePlayer()
  }, [])

  const handleClick = () => {
    console.log("Retured")
    setCurrentID(0)
    getPlayers()
  }

  const adoptPuppy = () => {
    console.log("Goodbye old friend")
    const deletePlayer = async() => {
      const deleteURL = `${API_URL}${currentID}`
        fetch(`${API_URL}`, {
          method: 'DELETE',
        });
        try {
          const response = await fetch(
            `${deleteURL}`,
            {
              method: 'DELETE',
            }
          );
          const result = await response.json();
          console.log(result);
          handleClick()
        } catch (err) {
          console.error(err);
        }
  
    }
    deletePlayer()
  }
  return (
    <section>
      <h3>Name: {currentPlayer.name}</h3>
      <h3>ID: {currentID}</h3>
      <img src={currentPlayer.imageUrl}/>
      <h3>Breed: {currentPlayer.breed}</h3>
      <h3>Status: {currentPlayer.status}</h3>
      <button onClick={() => {handleClick()}}>Return</button>
      <button onClick={() => {adoptPuppy()}}>Delete</button>
    </section>
  );
}

export default RenderSinglePlayer