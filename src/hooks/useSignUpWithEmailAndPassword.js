import {
    useCreateUserWithEmailAndPassword
} from 'react-firebase-hooks/auth';
import {
    auth,
    firestore
} from '../firebase/firebase';
import {
    doc,
    setDoc
} from "firebase/firestore";


const UseSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    const signup = async (inputs) => {

        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
            console.log("Please fill all the fields")
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

            if (!newUser && error) {
                console.log(error);
                return;
            }
            if (newUser) {
                const userDocument = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullname: inputs.fullname,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };

                await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
                localStorage.setItem("user-info", JSON.stringify(userDocument));
            }

        } catch (error) {
            console.log(error);
        }
    };

    return {
        loading,
        error,
        signup
    };
}

export default UseSignUpWithEmailAndPassword