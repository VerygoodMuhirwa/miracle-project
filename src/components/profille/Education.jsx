import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill } from "react-icons/bs";
import { formDataActions } from "../../store/slices/formData";

const Education = () => {
  const dispatch = useDispatch();
  const [addNewData, setAddNewData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [ableToEdit,setBeAbleToEdit] = useState(false);

  const education0 = useSelector((state) => state.logged.userData.profile.education);
console.log(education0);
  useEffect(() => {
    // Use a separate function to handle the asynchronous data transformation
      const educations = education0.flatMap((inner) => inner);
      dispatch(formDataActions.addEducation(educations));

  }, [education0]);
  const educationInitialValues0 = useSelector((state) => state.formData.education);
  const educationInitialValues = educationInitialValues0.flatMap((inner) => inner);
  const [education, setEducation] = useState({
    _id: Math.floor(Math.random() * 90),
    school: "",
    description: "",
  });

  const updateSchool = (e) => {
    setEducation((prev) => ({ ...prev, school: e.target.value }));
  };

  const updateShoolDescription = (e) => {
    setEducation((prev) => ({ ...prev, description: e.target.value }));
  };
  const handleNewData = (e) => {
    e.preventDefault();

    // Add a new invention
    // educationInitialValues.shift()
    dispatch(formDataActions.addEducation(education));
    setAddNewData(false);
    setEditData(null); // Reset the edit state after successfully handling edit or adding a new invention
  };
  const handleEdit = (itemId) => {
    setBeAbleToEdit(prev=>!prev)

    setEditData(itemId);
    const itemToEdit = educationInitialValues.find((item) => item._id === itemId);
    setEducation({
      _id: itemToEdit._id,
      school: itemToEdit.school,
      description: itemToEdit.description,
    });
    setAddNewData(false); // Close the add new data form when opening the edit form
  };

  const handleAddNewData = () => {
    if (editData) {
      // Reset the editData state to null if in edit mode
      setEditData(null);
    } else {
      // Toggle the addNewData state if not in edit mode
      setAddNewData((prev) => !prev);
    }
    // Reset the invetion state to its initial empty values
    setEducation({
      _id: Math.floor(Math.random() * 90),
      school: "",
      description: "",
    });
  };
  const handleEditChanges = (e) => {
    e.preventDefault();
    const editEducation = {
      _id: editData,
      school: education.school,
      description: education.description,
    };
    dispatch(formDataActions.editEducation(editEducation));
    setEditData(null);
    setEducation({
      _id: null,
      school: "",
      description: "",
    });
  };

  const handleDelete = (_id) => {
    dispatch(formDataActions.deleteEducation({ _id: _id }));
  };

  return (
    <div className="h-full sm:px-20 overflow-hidden  ">
      <div className="relative w-full h-40 ">
        <img
          src={
            userData ? userData.profile.backgroundPicture : "/assets/codes.png"
          }
          alt="codes image"
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg r"
        />
        <div className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1 absolute right-2 top-2">
          <BsPencilFill size={20} color="white" />
        </div>
      </div>
      <div className="absolute ss:top-[20%] sm:left-[13%] md:left-[10%] ss:left-[10%]  flex flex-row  justify-center items-center">
        <img
          src={userData ? userData.profile.profilePicture : "/assets/codes.png"}
          alt="user image"
          className="object-cover w-28  rounded-full h-28 "
        />
        <div className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1">
          <BsPencilFill
            size={20}
            color="white"
            className="hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-white  flex justify-center pt-20 px-[5%]     flex-col flex-wrap gap-10 rounded-b-md border-b-2 pb-5">
        {editProfile ? (
          <>
            <div>
              <form className="flex flex-col gap-5" onSubmit={handleSubmition}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Name" className="text-[#555]">
                      Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      value={Name}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-[#555]">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="skills" className="text-[#555]">
                      Tutor Skills ( Please separate them by comma )
                    </label>
                    <input
                      type="text"
                      id="skills"
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      value={skillsValue}
                      onChange={(e) => setSkillsValue(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="hoursRate" className="text-[#555]">
                      HourlRate
                    </label>
                    <input
                      type="number"
                      id="hoursRate"
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      value={hoursRateValue}
                      onChange={(e) => setHoursRateValue(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="country" className="text-[#555]">
                      Country
                    </label>
                    <div>
                      <Combobox
                        onChange={(selectedCountry) => {
                          setCountryNameValue(selectedCountry[1]);
                          setFlagValue(selectedCountry[0]);
                          setCountryCode(selectedCountry[2]);
                        }}
                      >
                        <div className="relative">
                          <Combobox.Input
                            displayValue={(country) => {
                              return country[0] + "  " + country[1];
                            }}
                            onChange={(e) => {
                              setQuery(e.target.value);
                              setCountryNameValue(e.target.value);
                              setFlagValue(e.target.value);
                            }}
                            className="border-2 rounded-t-md py-1 w-8/12 px-2 text-[#555] pr-8" // Add 'pr-8' for right padding
                          />

                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-10"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")} // Clear the query after the transition
                          >
                            <Combobox.Options className="border-b border-l border-r border-black w-8/12">
                              {filteredCountries.map((country) => (
                                <Combobox.Option
                                  key={country.name}
                                  className={({ active }) =>
                                    `relative   border-b py-2 px-2  ${active
                                      ? "bg-primary-blue text-[#555] cursor-pointer"
                                      : ""
                                    }`
                                  }
                                  value={[
                                    country.flag,
                                    country.name,
                                    country.code,
                                  ]}
                                >
                                  <span className="flex items-center">
                                    <span className="mr-2">{country.flag}</span>
                                    <span>{country.name}</span>
                                  </span>
                                </Combobox.Option>
                              ))}
                            </Combobox.Options>
                          </Transition>
                        </div>
                      </Combobox>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="city" className="text-[#555]">
                      City
                    </label>
                    <Combobox
                      onChange={(selectedCity) => {
                        setCityDetails(selectedCity);
                        setSelectCity(selectedCity[0]);
                      }}
                    >
                      <div className="relative">
                        <Combobox.Input
                          value={selectCity ? selectCity.name : ""}
                          displayValue={(city) => {
                            return city.name;
                          }}
                          onChange={(e) => {
                            setQuery(e.target.value), e.preventDefault();
                          }}
                          className="border-2 rounded-t-md py-1 w-8/12 px-2 text-[#555] pr-8" // Add 'pr-8' for right padding
                        />

                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-10"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQuery("")} // Clear the query after the transition
                        >
                          <Combobox.Options className="border-b border-l border-r border-black w-8/12">
                            {filteredCities.map((city) => (
                              <Combobox.Option
                                key={`${city.stateCode}-${city.name}`} // Use both stateCode and name for a unique key
                                className={({ active }) =>
                                  `relative   border-b py-2 px-2  ${active
                                    ? "bg-primary-blue text-[#555] cursor-pointer"
                                    : ""
                                  }`
                                }
                                value={[city]}
                              >
                                <span className="flex items-center">
                                  <span>{city.name}</span>
                                </span>
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[#555]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={emailValue}
                      onChange={(e) => setEmailNameValue(e.target.value)}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phoneNumber" className="text-[#555]">
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={phoneNumberValue}
                      onChange={(e) => setPhoneNameValue(e.target.value)}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                    />
                  </div>
                </div>

                <div className="flex sm:flex-row ss:flex-col sm:justify-between ss:gap-3">
                  <div className="flex flex-row gap-3 items-center">
                    <input
                      type="radio"
                      id="collaborate"
                      checked={openToCollabrateValue}
                      onChange={() => setOpenToCollabrateValue((prev) => !prev)}
                    />
                    <label htmlFor="collaborate" className="text-[#555]">
                      Open to Collaborate
                    </label>
                  </div>

                  <div className="align-baseline sm:self-end flex sm:flex-row ss:gap-5">
                    <input
                      type="submit"
                      value="Save"
                      className="px-10 bg-[#9E6F27] hover:bg-[#825E27] text-white py-1 rounded-xl"
                    />
                    <button
                      onClick={handleEditProfile}
                      className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div>
              <div>
                <div className="flex sm:flex-row ss:flex-col sm:justify-between ss:gap-3">
                  <div className="flex flex-row gap-2 items-center">
                    <h1 className="text-[#9E6F27] text-xl">{username}</h1>
                    <p>{countryInfo?.flag | "🇨🇦"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {openToCollabrate && (
                      <button className="bg-[#64B94F] px-5 py-2 rounded-md">
                        Open to Collaborate
                      </button>
                    )}

                    <div className="bg-[#9E6F27] flex justify-center items-center rounded-full px-2 py-1 self-end">
                      <BsPencilFill
                        size={20}
                        color="white"
                        onClick={handleEditProfile}
                        className="hover:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <p>{id}</p>
              </div>
              <div>
                <p>{title}</p>
              </div>
              <div className="flex flex-col  gap-3 mb-5">
                <p>{skills}</p>
                <p>
                  <span>{countryInfo?.countryName}</span>{" "}
                  <span>{countryInfo?.city}</span>
                </p>
                <p>{email}</p>
                <p>{phoneNumber}</p>
              </div>
              <div className="flex md:flex-row ss:flex-col justify-between gap-3  ">
                <div className="flex md:flex-row ss:flex-col  gap-6 md:self-center  ">
                  <button className="border-2 border-[#9E6F27]  align-middle px-7 text-[#9E6F27] hover:bg-[#EDE4CE]  rounded-2xl h-12">
                    Share
                  </button>
                  <button className="border-2 border-[#9E6F27]  align-middle px-7 text-[#9E6F27] bg-[#FFEAB2] hover:bg-[#FFDD87] py-2 rounded-2xl h-12">
                    Favorite
                  </button>
                  <button className="border-2 border-[#9E6F27]  align-middle px-7 text-white bg-[#9E6F27] hover:bg-[#825E27] py-2 rounded-2xl h-12">
                    Message
                  </button>
                </div>
                <div className="flex flex-col  sm:self-baseline ss:gap-4">
                  <button className="bg-[#009ED0] text-white px-5 py-2 rounded-md">
                    Hourly Rate : {hoursRate}USR
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Education;
