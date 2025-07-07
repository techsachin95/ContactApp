// import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { favoriteUpdateById, fetchListOfContact } from "../Api/Api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import useGlobalStore from "../GlobalStore/GlobalStore";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Button } from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import EditDeleteFormComponent from "./EditDeleteFormComponent";

const ListComponent = () => {
  const { favorite, searchInputData,setContactIdToGlobalStore } = useGlobalStore((state) => state);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contacts", searchInputData],
    queryFn: () => fetchListOfContact(searchInputData),
  });
  // console.log(data, searchInputData);

  let filterContact = data;

  // if (searchInputData) {
  //   filterContact = filterContact.filter((item) =>
  //     item.name.toLowerCase().includes(searchInputData.toLowerCase())
  //   );
  // } else {
  //   filterContact = data;
  // }

  if (favorite) {
    filterContact = filterContact.filter((item) => item.favorite === true);
  }

  //adding loader during contact details fetching
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography sx={{ fontSize: "18px" }} align="center">
          Loading Contact List, Please Wait...
        </Typography>
      </Box>
    );
  }

  //handelling error during contact details loading
  if (isError) {
    return (
      <Typography sx={{ fontSize: "18px" }} align="center">
        Error in Loding Contact Details
      </Typography>
    );
  }
  // const [items, setitems] = useState();

  // async function fetchdata() {
  //   const items = await fetchListOfContact();
  //   if (favorite) {
  //     const filterdata = items.filter((item) => item.favorite === favorite);
  //     setitems(filterdata);
  //   } else {
  //     setitems(items);
  //   }
  // }

  // useEffect(() => {
  //   fetchdata();
  // }, [favorite, searchInputData]);

  async function favroitUpdateFunction(id, favoriteData) {
    await favoriteUpdateById(id, favoriteData);
    queryClient.invalidateQueries(["contacts"]); // refetch updated data
  }

  function openEditModal(data) {
    setOpen(true);
    setContactIdToGlobalStore(data)
  }

  return (
    <>
      <List>
        {filterContact && filterContact.length > 0 ? (
          filterContact.map((item) => (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                border: "2px solid black",
                mb: 2,
                p: 1,
                borderRadius: 2,
              }}
               key={item.id}
              onClick={() => openEditModal(item.id)}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <Avatar sx={{ fontSize: "18px", p: 1 }}>
                  {item.name[0].toUpperCase()}
                </Avatar>
                <ListItem key={item.id} sx={{ p: 1 }}>
                  <ListItemText
                    fontSize="10px"
                    primary={item.name}
                    secondary={item.email}
                  />
                </ListItem>
                {item.favorite ? (
                  <Button
                    sx={{ backgroundColor: "transparent" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      favroitUpdateFunction(item.id, item.favorite);
                    }}
                  >
                    <StarOutlinedIcon sx={{ color: "gold" }} />
                  </Button>
                ) : (
                  <Button
                    sx={{ backgroundColor: "transparent" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      favroitUpdateFunction(item.id, item.favorite);
                    }}
                  >
                    <StarOutlineIcon />
                  </Button>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ fontSize: "18px" }} align="center">
            There Is No Contact Added
          </Typography>
        )}
      </List>

      {open && (
        <EditDeleteFormComponent
          open={open}
          setOpen={setOpen}
          // contact={selectedContact}
        />
      )}
    </>
  );
};

export default ListComponent;
