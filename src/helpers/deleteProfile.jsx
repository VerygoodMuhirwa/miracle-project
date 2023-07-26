import  axios  from 'axios';
export const deleteProfile=async(id)=>{
    try {
    const token = JSON.parse(localStorage.getItem("userData")).token;
        
        if(!id) return
        const res=await axios.delete(`http://localhost:5002/api/v1/profile/deleteProfile/${id}`,{headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },})
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
}