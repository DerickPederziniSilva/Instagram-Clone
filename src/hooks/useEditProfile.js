import { useState } from 'react'
import { auth, firestore, storage } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import useUserProfileStore from '../store/userProfileStore';

const useEditProfile = () => {

    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)
    const [isUpdating, setIsUpdating] = useState();
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    const showToast = useShowToast();


    const editProfile = async (inputs, selectedFile) => {

       if(isUpdating && !authUser){
            return;
       }
       setIsUpdating(true);

       //a storageReference is used, in this case, to update metadata
       const storageRef = ref(storage, `profilePics/${authUser.uid}`);
       const userDocRef = doc(firestore, "users", authUser.uid);

       let URL = '';

       try {
        if(selectedFile) {
            await uploadString(storageRef, selectedFile, "data_url");
            URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
        }

        const updatedUser = {
            ...authUser,
            fullname:inputs.fullname || authUser.fullname,
            username:inputs.username || authUser.username,
            bio:inputs.bio || authUser.bio,
            profilePicURL: URL || authUser.profilePicURL,
        }

        await updateDoc(userDocRef, updatedUser);
        localStorage.setItem("user-info", JSON.stringify(updatedUser))
        setAuthUser(updatedUser);
        setUserProfile(updatedUser);
        showToast("Success", "Settings updated sucessfully", "success")

       } catch (error) {
        
        showToast("Error", error.message, "error")

       }
       
       return {editProfile, isUpdating} } 
    } 
export default useEditProfile