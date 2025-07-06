export const fetchListOfContact = async (search = "") => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const ApiResponce = await fetch(
      `http://localhost:3001/api/contacts?q=${search}`
    );
    const contactList = await ApiResponce.json();
    return contactList;
  } catch (err) {
    console.log(err);
  }
};

export const favoriteUpdateById = async (id, currentFavoriteValue) => {
  const updatedContact = {
    favorite: !currentFavoriteValue, // toggle the value
  };

  const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedContact),
  });

  if (!response.ok) {
    throw new Error("Failed to update favorite status");
  }

  const result = await response.json();
  // console.log(result);
  return result;
};



export const addNewClient = async (data) => {
  const response = await fetch(`http://localhost:3001/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update favorite status");
  }

  const result = await response.json();
  // console.log(result);
  return result;
};
