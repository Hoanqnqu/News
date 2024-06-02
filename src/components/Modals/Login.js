import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Button, Text, View } from 'react-native';
import React, { useState } from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signInWithGoogle } from '../../utils/auth';
const Login = () => {
    const [userInfo, setUserInfo] = useState('')
    const handleSignIn = async () => {
        const userInfo = await signInWithGoogle();
        setUserInfo(userInfo?.user?.id)
    };
    return (
        <Animated.View
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}
            style={{
                backgroundColor: 'white',
                padding: 24,
                height: 500,
                width: '100%',
                position: 'absolute',
                bottom: -20 * 1.1,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                zIndex: 100,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text>{userInfo || ''}</Text>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    onPress={handleSignIn}
                />
            </View>

        </Animated.View>
    )

}
export default Login