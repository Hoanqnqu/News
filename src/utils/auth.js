import { WEB_CLIENT_ID } from '@env';

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '869965077161-dh9p7ervk215dm02u9nnenjkv2jn2vis.apps.googleusercontent.com',
});



export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    } catch (error) {
        const err = error
        if (err.code === statusCodes.SIGN_IN_CANCELLED) {
            console.debug('Cancelled sign in');
        } else if (err.code === statusCodes.IN_PROGRESS) {
            console.debug('Sign in in progress');
        } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.debug('Play services not available');
        } else {
            console.debug('Unknown error', err);
        }
    }
};