const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports.createToken = async (user) => {
    let tokenAge = 60 * 60 * 24 * 10;
    const token = await jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
        expiresIn: tokenAge,
    });
    return token;
};
module.exports.isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
// console.log(authorization);
    if (authorization) {
        const token1 = authorization.split(" ");
        const token = token1.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};







jodos
:money_mouth_face:  6:40 AM
Screenshot from 2023-07-27 06-39-58.png
 


New


jodos
:money_mouth_face:  7:51 AM
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProfile } from "./fetchProfile";
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
        availability: newAvailability,
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
      console.log(res);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const newProfile = res.data.profile;
      const updatedUserData = Object.assign({}, userData, {
        profile: newProfile,
      });
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};  