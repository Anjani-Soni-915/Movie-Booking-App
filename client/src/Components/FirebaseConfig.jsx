import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTY4D2bA8AIBiqCae3TYaziJQimVm_ImE",
  authDomain: "moviebookingapp-7fe51.firebaseapp.com",
  projectId: "moviebookingapp-7fe51",
  storageBucket: "moviebookingapp-7fe51.appspot.com",
  messagingSenderId: "676121379995",
  appId: "1:676121379995:web:3b87c540be596ee7a9723e",
  measurementId: "G-G03PLTJFYC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { auth, signInWithGoogle };

