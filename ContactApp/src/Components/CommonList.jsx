import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const CommonList = ({ items, renderItem }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} divider>
          {renderItem ? renderItem(item) : <ListItemText primary={item} />}
        </ListItem>
      ))}
    </List>
  );
};

export default CommonList;
