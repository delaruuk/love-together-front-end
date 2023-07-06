
import axios from "axios";
import {
	PostSurveyAnswer,
	SurveyQuestion,
	PostMongoUser,
	UserQuestion,
	UserInfo,
	FirebaseUser,
	MongoUser,
} from "models";
import firebase from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/auth';
import { auth } from "firebase-config/firebaseConfig";

require('dotenv').config();

// Init firebase 
firebase.initializeApp();

// Add dummy user info
const email = "ezra.klitsie@lovetogether.com";
const pword = "lovetogether";
// define user & token 
let user: FirebaseUser | null = null;
let token: string | null = null;

export const signInUser = async (email: string, password: string) => {
    try
    {

   
        const userCredential = await signInWithEmailAndPassword(auth, email, pword)
        // User is signed in
        const user = userCredential.user;
        console.log(user);
        // Get user token
        const token = await user.getIdToken();
        console.log(token);
        return user;
        // ...
    }
    catch(error: any)
    {
        if (error instanceof Error)
        {
        console.error(error, error.message);
        }
        return null;
    }
};

const = signInUser(email, pword)
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(baseUrl);


export const getAllQuestions = async(user: FirebaseUser)=> 
{
    try 
    {
        const toke = await user.getIdToken();
        console.log('Getting questions...');
        // const token = await user?.getIdToken(false);
        const response = await axios.get(`${baseUrl}questions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    }
   catch (err)
    {
        console.log(err);
        return err;
    }
}

getAllQuestions()

// export const getUserQuestions = async (user: FirebaseUser) => {
// 	const token = await user?.getIdToken(false);
// 	const res = await axios.get(`${baseUrl}userquestions`, {
// 		headers: {
// 			authorization: `Bearer ${token}`,
// 		},
// 	});
// 	return res.data;