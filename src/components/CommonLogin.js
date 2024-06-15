import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signInWithGoogle } from '../utils/auth';
import { useMutation } from '@tanstack/react-query';
import apiInstance from '../utils/axiosConfig';
import AsyncStorage from "@react-native-async-storage/async-storage"
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginRequiredContext } from "../hooks/loginContext";
import { AuthContext } from '../hooks/authContext';
const CommonLogin = () => {
    const context = useContext(LoginRequiredContext);
    const [token, setToken] = useState("co cl");
    const { login } = useContext(AuthContext);
    const mutation = useMutation({
        mutationFn: (newTodo) => {
            return apiInstance.post('/login', newTodo)
        },
    })
    useEffect(() => {
        if (mutation.isSuccess) {
            console.log(mutation.data?.data?.token)
            login(mutation.data?.data?.token)
            context.handleLoginRequired(false)
        }
    }, [mutation.isSuccess])
    const handleSignIn = async () => {
        const userInfo = await signInWithGoogle();
        setToken(userInfo?.user?.id)
        console.log({
            auth_id: userInfo?.user?.id,
            name: userInfo?.user?.name,
            email: userInfo?.user?.email,
            role: 'user',
            image_url: userInfo?.user?.photo
        })

        mutation.mutate({
            auth_id: userInfo?.user?.id,
            name: userInfo?.user?.name,
            email: userInfo?.user?.email,
            role: 'user',
            image_url: userInfo?.user?.photo
        })
    };
    return (
        <View className="flex-1 justify-center items-center  w-full">
            <LottieView
                style={{
                    width: 400,
                    height: 200,
                }}
                source={require('./Lottie/Animation.json')}
                autoPlay
                loop
            />
            <TouchableOpacity onPress={handleSignIn} className="flex flex-row mt-10 justify-center items-center bg-slate-200 px-10 rounded-full py-3">
                <Ionicons name='logo-google' size={24} color='black' />
                <Text className="ml-4" >Continue with Google</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CommonLogin