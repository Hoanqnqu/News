import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Button, Text, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState, useContext } from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signInWithGoogle } from '../utils/auth';
import { useMutation } from '@tanstack/react-query';
import apiInstance from '../utils/axiosConfig';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthRequirement } from './AuthRequired';
import { AuthContext } from '../hooks/authContext';

//869965077161-dh9p7ervk215dm02u9nnenjkv2jn2vis.apps.googleusercontent.com
const ProfileScreen = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const signOut = async () => {
    try {

      await GoogleSignin.signOut();
      logout()
      console.log('User signed out successfully');
      // Optionally, you can update your app state to reflect the user has signed out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = async () => {
    const userInfo = await signInWithGoogle();
    console.log({
      auth_id: userInfo?.user?.id,
      name: userInfo?.user?.name,
      email: userInfo?.user?.email,
      role: 'user',
      image_url: userInfo?.user?.photo
    })
    setUserInfo(userInfo?.user?.id)
    mutation.mutate({
      auth_id: userInfo?.user?.id,
      name: userInfo?.user?.name,
      email: userInfo?.user?.email,
      role: 'user',
      image_url: userInfo?.user?.photo
    })
  };
  if (!userInfo) {
    return (<AuthRequirement />)
  }
  return (
    <View
      className="flex flex-col justify-center items-center"
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Button title="Sign Out" onPress={signOut} />
    </View>
  )

}
export default ProfileScreen