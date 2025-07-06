import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { fetchListOfContact } from "../Api/Api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const CommonList = () => {
  const [items, setitems] = useState();
  async function fetchdata() {
    const items = await fetchListOfContact();
    setitems(items);
  }
  console.log(items);

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <List>
      {items && items.length > 0 ? (
        items.map((item) => (
          <Box sx={{ fontSize: "10px" }}>
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={item.email} />
            </ListItem>
          </Box>
        ))
      ) : (
        <Typography sx={{ fontSize: "18px" }} align="center">
          There Is No Contact Added
        </Typography>
      )}
    </List>
  );
};

export default CommonList;
