import "./App.css";
import "@fontsource/roboto/700";
import CommonCard from "./Components/CommonCard";
import Typography from "@mui/material/Typography";
import useGlobalStore from "./GlobalStore/GlobalStore";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import CommonSearchInput from "./Components/CommonSearchInput";
import Box from "@mui/material/Box";

function App() {
  const [searchData, setsearchData] = useState();
  const { favorite, favoriteFunction, setSearchDataToGlobalStore } =
    useGlobalStore((state) => state);

  function searchdata(e) {
    setsearchData(e.target.value);
    setSearchDataToGlobalStore(searchData);
  }
  return (
    <>
      <CommonCard>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <CommonSearchInput value={searchData} onChange={searchdata} />
          <Checkbox checked={favorite} onChange={favoriteFunction} />
          <Typography sx={{ fontSize: "10px" }}>Show Favorite</Typography>
        </Box>
        <Box>
          <CommonCard>
            
          </CommonCard>
        </Box>
        <Box>

        </Box>
      </CommonCard>
    </>
  );
}

export default App;
