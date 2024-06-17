
import { Button, Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { signInWithGoogle } from '../utils/auth';

import { AuthRequirement } from './AuthRequired';
import { AuthContext } from '../hooks/authContext';
import LottieView from 'lottie-react-native';
GoogleSignin.configure({
  webClientId: '869965077161-dh9p7ervk215dm02u9nnenjkv2jn2vis.apps.googleusercontent.com',
});
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
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <TouchableOpacity style={styles.button} className="bg-[#52575D] flex justify-center items-center w-[100px] right-0 absolute my-4 mx-4 z-10" onPress={signOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <View className="h-[200px] bg-[#D8EFD3]">
          </View>
          <View className="absolute flex items-center" style={{ alignSelf: "center" }}>

            <View className="absolute w-[220px] h-[220px] mt-[90px] bg-white rounded-full border-1" style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}></View>
            <View style={styles.profileImage}>
              <Image source={{
                uri:
                  'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/365120153_3332590973717802_2390387319335403871_n.jpg?stp=dst-jpg_p480x480&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEjVLT0-I_uLGz9cnm1Q4Ao-ISRkwI191n4hJGTAjX3WbvlPBqV4VrhTuricRcPRrLziqlJt3M2TgNgXwRCvIJM&_nc_ohc=NBRNM2pYLNkQ7kNvgG7etTV&_nc_ht=scontent.fdad1-3.fna&oh=00_AYAo2YOo6R_tLoSQrsJF64UQ5EaM4av44BhaDqwTtOhFnA&oe=666E5F57',
              }} style={styles.image} ></Image>
            </View>

            <View style={styles.add}>

            </View>
          </View>

          <View className="mx-6 " style={styles.infoContainer}>
            <Text className="mt-3" style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie</Text>
            <Text className="font-serif text-base text-gray-900 dark:text-neutral-300">User</Text>
            <View className="flex flex-row justify-between w-full mt-3">
              <Text className="text-gray-900" style={[styles.text, { color: "#AEB5BC", fontSize: 15 }]} >Email</Text>
              <Text style={[styles.text, { color: "#AEB5BC", fontSize: 15 }]}>nhathoangthuychaub1@gmail.com</Text>
            </View>

            <View className="flex flex-row justify-between w-full mt-2">
              <Text className="text-gray-900" style={[styles.text, { color: "#AEB5BC", fontSize: 15 }]} >Phone</Text>
              <Text style={[styles.text, { color: "#AEB5BC", fontSize: 15 }]}>0852336242</Text>
            </View>
            <View style={styles.divider} />

            <Image source={require('../components/Lottie/news.jpeg')} className="w-[400px] h-[200px] mt-24" />
          </View>


        </ScrollView>
      </SafeAreaView>

    </>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    position: "relative"
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#5E5D5E',
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    marginTop: 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 100
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 100
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  button: {

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
export default ProfileScreen