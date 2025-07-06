import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { fetchListOfContact } from "../Api/Api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";


const ListComponent = () => {
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "2px solid black",
              mb: 2,
              p: 1,
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ fontSize: "18px", p: 1 }}>H</Avatar>
            <ListItem key={item.id} sx={{ p: 1 }}>
              <ListItemText
                fontSize="10px"
                primary={item.name}
                secondary={item.email}
              />
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

export default ListComponent;
