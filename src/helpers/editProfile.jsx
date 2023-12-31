import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { userActions } from "path/to/userCredentialsSlice"; // Import the appropriate path to your userCredentials slice

export const HandleEditProfile = async ({
  about,
  certificate,
  experience,
  education,
  tutorialSkills,
  invetions,
  patents,
  hourlyRates,
  country,
  phoneNumber,
  openToCollaborate,
  backgroundPicture,
  availability,
  token,
}) => {
  try {

    const newCertificate = certificate.map((item) => {
      const { _id, title, description } = item;
      return { title, description };
    });

    const newExperience = experience.map((item) => {
      const { _id, company, description } = item;
      return { company, description };
    });

    const NewEducation = education.map((item) => {
      const { _id, school, description } = item;
      return { school, description };
    });

    const newInvetions = invetions.map((item) => {
      const { _id, title, description } = item;
      return { title, description };
    });
    const newPatents = patents.map((item) => {
      const { _id, title, description } = item;
      return { title, description };
    });
    const newAvailability = availability.map((item) => {
      const { _id, day, range } = item;
      return { day, range };
    });
    console.log(country);
    const newCountry = JSON.stringify(country);

    const res = await axios.post(
      "https://miracle.onrender.com/api/v1/profile/editProfile",
      {
        about,
        education: NewEducation,
        certification: newCertificate,
        experience: newExperience,
        tutorialSkills,
        inventions: newInvetions,
        patents: newPatents,
        availability:newAvailability,
        hourlyRates,
        country: newCountry,
        phoneNumber,
        openToCollaborate,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const newProfile = res.data.profile;
      const updatedUserData = Object.assign({}, userData, {
        profile: newProfile,
      });
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
  } catch (error) {
    console.log(error);
  }
};
