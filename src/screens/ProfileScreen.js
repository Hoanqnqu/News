
import { Button, Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { signInWithGoogle } from '../utils/auth';
import FeatherIcon from "react-native-vector-icons/Feather";
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
              < Image source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5Yo24K45gHxcrK_QH3boGcH1uUjMIQ8nKygzVAdS5cE3O1LSjInbW5inRFbPfMHlxkY&usqp=CAU',
              }} style={styles.image} />
            </View>

            <TouchableOpacity style={styles.add}>
              <FeatherIcon name="edit" color="white" size={22} />
            </TouchableOpacity>
          </View>

          <View className="mx-6 " style={styles.infoContainer}>
            <Text className="mt-3" style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie</Text>
            <Text className="font-serif text-base text-gray-900 dark:text-neutral-300">User</Text>
            <View className="flex flex-row justify-between w-full mt-3">
              <Text className="text-gray-900" style={[styles.text, { fontSize: 15 }]} >Email</Text>
              <Text className="text-gray-900" style={[styles.text, { fontSize: 15 }]}>nhathoangthuychaub1@gmail.com</Text>
            </View>

            <View className="flex flex-row justify-between w-full mt-4">
              <Text className="text-gray-900" style={[styles.text, { fontSize: 15 }]} >Phone</Text>
              <Text className="text-gray-900" style={[styles.text, { fontSize: 15 }]}>0852336242</Text>
            </View>

            <View className="w-screen h-[0.5px]  mt-6 bg-[#52575D] z-100" ></View>
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
    height: 10,
    backgroundColor: 'black',
    width: "100%",
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