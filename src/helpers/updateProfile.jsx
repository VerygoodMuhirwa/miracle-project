import axios from "axios";
export const updateProfile = async (objectType, data) => {
  try {
    if (!objectType && !data) return;
    const token = JSON.parse(localStorage.getItem("userData")).token;
    console.log(objectType, data);
    const id=data._id
    const res = await axios.put(
      `http://localhost:5002/api/v1/profile/updateProfile/${id}`,
      { objectType, data },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
};
