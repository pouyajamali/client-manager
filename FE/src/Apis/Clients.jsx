import axios from "axios";

export const getClients = async () => {
  try {
    const response = await axios.get("http://localhost:8080/clients");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getClientDetail = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateClient = async (id, data) => {
  //   if (
  //     !data.name.trim() ||
  //     !data.email.trim() ||
  //     !data.phone.trim() ||
  //     !data.address.trim()
  //   ) {
  //     // setError("Title and description cannot be blank");
  //     return;
  //   }

  try {
    const response = await axios.put(
      `http://localhost:8080/clients/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  } finally {
    // alert("Your video was successfully uploaded!");
  }
};

export const addClient = async (data) => {
  // if (
  //   !data.name.trim() ||
  //   !data.email.trim() ||
  //   !data.phone.trim() ||
  //   !data.address.trim()
  // ) {
  //   setError("Title and description cannot be blank");
  //   return;
  // }

  try {
    const response = await axios.post("http://localhost:8080/clients", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const id = response.data.id;
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  } finally {
    alert("Your client was successfully added!");
  }
};

export const addClientMeeting = async (clientId, data) => {
  // if (
  //   !data.name.trim() ||
  //   !data.email.trim() ||
  //   !data.phone.trim() ||
  //   !data.address.trim()
  // ) {
  //   setError("Title and description cannot be blank");
  //   return;
  // }

  try {
    const response = await axios.post(
      `http://localhost:8080/clients/${clientId}/meeting`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const id = response.data.id;
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  } finally {
    alert("Your client meeting was successfully added!");
  }
};

export const deleteClient = async (id) => {
  //   if (
  //     !data.name.trim() ||
  //     !data.email.trim() ||
  //     !data.phone.trim() ||
  //     !data.address.trim()
  //   ) {
  //     // setError("Title and description cannot be blank");
  //     return;
  //   }

  try {
    const response = await axios.delete(`http://localhost:8080/clients/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  } finally {
    // alert("Your video was successfully uploaded!");
  }
};
