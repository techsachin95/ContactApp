import "./App.css";
import "@fontsource/roboto/400";
import CardComponent from "./Components/CardComponent";
import Typography from "@mui/material/Typography";
import useGlobalStore from "./GlobalStore/GlobalStore";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import SearchInputComponent from "./Components/SearchInputComponent";
import Box from "@mui/material/Box";
import ListComponent from "./Components/ListComponent";
import AddFormComponent from "./Components/AddFormComponent";

function App() {
  const [searchData, setsearchData] = useState();
  const { favorite, favoriteFunction, setSearchDataToGlobalStore } = useGlobalStore((state) => state);

  function searchdata(e) {
    setsearchData(e.target.value);
    setSearchDataToGlobalStore(searchData);
  }
  return (
    <>
      <CardComponent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <SearchInputComponent value={searchData} onChange={searchdata} />
          <Checkbox checked={favorite} onChange={favoriteFunction} />
          <Typography sx={{ fontSize: "10px" }}>Show Favorite</Typography>
        </Box>
        <Box>
          <CardComponent>
            <ListComponent></ListComponent>
          </CardComponent>
        </Box>
        <Box sx={{ mt: 2 }}>
          <AddFormComponent></AddFormComponent>
        </Box>
      </CardComponent>
    </>
  );
}

export default App;
