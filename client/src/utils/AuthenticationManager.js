import firebase from 'firebase'
import firebaseui from 'firebaseui'
import {config} from '../helpers/firebaseConfig.js'

const AuthenticationManager = {
    init(successCallback, failureCallback) {
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                localStorage.uid = user.uid; 
                successCallback();
            }else{
                failureCallback();
            }
        });    
    },
    setAuthUI(div){
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start(div, uiConfig);
    },
    isAuthenticated(){
        return localStorage.uid != undefined;
    },
    logout(){
        localStorage.uid = undefined;
        firebase.auth().signOut();
    }
};

export default AuthenticationManager;