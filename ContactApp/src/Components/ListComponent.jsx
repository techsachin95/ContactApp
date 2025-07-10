import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchListOfContact, favoriteUpdateById } from "../Api/Api";
import EditDeleteFormComponent from "./EditDeleteFormComponent";
import useGlobalStore from "../GlobalStore/GlobalStore";

const ListComponent = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { favorite, searchInputData, setContactIdToGlobalStore } =
    useGlobalStore((state) => state);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [searchInputData, favorite]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contacts", page, limit, searchInputData, favorite],
    queryFn: () => fetchListOfContact(page, limit, searchInputData, favorite),
    keepPreviousData: true,
  });

  const filterContact = data?.contacts || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const { mutateAsync: handelfavoriteUpdateById } = useMutation({
  mutationFn: ({ id, currentFavoriteValue }) =>
    favoriteUpdateById(id, currentFavoriteValue),

  onSuccess: () => {
    queryClient.invalidateQueries(["contacts"]);
  },

  onError: (error) => {
    console.error("Favorite update failed:", error);
  },
});

function handleFavoriteToggle(id, currentFavoriteValue) {
  console.log(id, currentFavoriteValue);
  handelfavoriteUpdateById({ id, currentFavoriteValue });
}

  // const handleFavoriteToggle = async (id, isFav) => {
  //   await favoriteUpdateById(id, isFav);
  //   queryClient.invalidateQueries(["contacts"]);
  // };

  const openEditModal = (id) => {
    setContactIdToGlobalStore(id);
    setOpen(true);
  };


  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Loading Contact List, Please Wait...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Error in Loading Contact Details
      </Typography>
    );
  }

  return (
    <>
      
        {filterContact.length > 0 ? (
          filterContact.map((item) => (
            <List 
              key={item.id}
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                border: "2px solid black",
                mb: 1,
                p: 0.7,
                borderRadius: 2,
                cursor: "pointer",
                height: "50px",
              }}
              onClick={() => openEditModal(item.id)}>
              <Avatar sx={{ fontSize: "18px", mr: 2 }}>
                {item.name[0].toUpperCase()}
              </Avatar>
              <ListItem sx={{ flexGrow: 1 }}>
                <ListItemText primary={item.name} secondary={item.email} />
              </ListItem>
              <Button
                sx={{ backgroundColor: "transparent" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteToggle(item.id, item.favorite);
                }}
              >
                {item.favorite ? (
                  <StarOutlinedIcon sx={{ color: "gold" }} />
                ) : (
                  <StarOutlineIcon />
                )}
              </Button>
            </List>
          ))
        ) : (
          <Typography align="center">There Is No Contact Added</Typography>
        )}
     



      {/* MUI Pagination Dots */}
      <Stack
        sx={{
          position: "sticky",
          bottom: "-16px",
          backgroundColor: "white",
          padding: "10px",
          margin: "0px",
        }}
        spacing={2}
        alignItems="center"
        mt={2}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>

      {/* Modal */}
      {open && <EditDeleteFormComponent open={open} setOpen={setOpen} />}
    </>
  );
};

export default ListComponent;
