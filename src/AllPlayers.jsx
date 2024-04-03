const RenderAllPlayers = ({playerList, setUpdateApp, setCurrentID}) => {

  const handleClick = (player) => {
    setCurrentID(player.id)
    setUpdateApp(true)
  }

  return (
    <div>
      {
        playerList.map((player) => {return (
          <li key={player.id} onClick={() =>handleClick(player)}>{player.name}</li>
        )})
        }
    </div>
  );
}

export default RenderAllPlayers