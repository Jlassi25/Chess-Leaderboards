import "./App.css";
import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import useFetch from "./Hooks/useFetch";
import InputWithLabel from "./Components/InputWithLabel";
import List from "./Components/List";
import { useToast } from '@chakra-ui/react'


//Api Endpoint
const API_ENDPOINT = "https://api.chess.com/pub/leaderboards";

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { data, isLoading, error } = useFetch(API_ENDPOINT);
  const [players, setPlayers] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState("")
  const toast = useToast()


  // updates the players state variable with the value of data.daily. 
  // This effect is triggered whenever //data changes.
  React.useEffect(() => {
    if (data) {
      setPlayers(data.daily)
    }
  }, [data]);

  //On Click Delete player
  const handleRemovePlayer = (item) => {
    toast({
      title: 'Player Deleted.',
      description: "Player has been deleted successfully!",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    const newPlayers = players.filter(
      (res) => item.player_id !== res.player_id
    );
    setPlayers(newPlayers);
  };


  // handle the input onchange event when the value of the search input field changes
  const handleSearchInput = (event) => {
    console.log(event);
    setSearchTerm(event.target.value);
  };


  // filtering the players array based on a search term. 
  const SearchedList = players.filter(res => res.username.toLowerCase().includes(searchTerm.toLowerCase()))


  return (
    <>
      <div className="container">
        <h1 className="d-flex justify-content-center ">Chess Leaderboards</h1>

        {/* Search Input and Add player Button */}
        <InputWithLabel
          players={players}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          setPlayers={setPlayers}
          id="search"
          value={searchTerm}
          onInputChange={handleSearchInput}
        >
          <strong>Search by username:</strong>
        </InputWithLabel>

        <hr />

        {/* If the error variable is truthy (i.e., not null, undefined, or false), the code renders a <p> element with the text "Something went wrong ...". */}
        {error && <p>Something went wrong ...</p>}

        {/* If the isLoading variable is true, indicating that data is being loaded, the code renders a <LoadingSpinner /> component. */}
        {/* If the isLoading variable is false, indicating that data has finished loading, the code renders a <List> component. */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <List players={players} setPlayers={setPlayers} setCurrentItem={setCurrentItem} currentItem={currentItem} list={SearchedList} onRemoveItem={handleRemovePlayer} />
        )}
      </div>

    </>
  );
};



export default App;
