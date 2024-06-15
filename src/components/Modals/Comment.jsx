import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { FlatList, TextInput, Text, View } from 'react-native';
import React from 'react';
import CommentBlock from '../CommentBlock';
const Comment = () => {

    return (
        <Animated.View
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}
            style={{
                backgroundColor: 'white',
                padding: 16,
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
                className="flex flex-col items-center justify-center h-full w-full"
            >
                <Text className="text-lg font-bold text-black">56 comments</Text>

                <FlatList className="w-full flex h-full"
                    showsVerticalScrollIndicator={false}
                    data={[
                        {
                            name: 'John Doe',
                            image_url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/365120153_3332590973717802_2390387319335403871_n.jpg?stp=dst-jpg_p480x480&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEjVLT0-I_uLGz9cnm1Q4Ao-ISRkwI191n4hJGTAjX3WbvlPBqV4VrhTuricRcPRrLziqlJt3M2TgNgXwRCvIJM&_nc_ohc=NBRNM2pYLNkQ7kNvgG7etTV&_nc_ht=scontent.fdad1-3.fna&oh=00_AYAo2YOo6R_tLoSQrsJF64UQ5EaM4av44BhaDqwTtOhFnA&oe=666E5F57',
                            created_at: '2022-05-11T10:50:12.000000Z',
                            comment: 'this is a comment',
                        },
                        {
                            name: 'John Doe',
                            image_url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/365120153_3332590973717802_2390387319335403871_n.jpg?stp=dst-jpg_p480x480&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEjVLT0-I_uLGz9cnm1Q4Ao-ISRkwI191n4hJGTAjX3WbvlPBqV4VrhTuricRcPRrLziqlJt3M2TgNgXwRCvIJM&_nc_ohc=NBRNM2pYLNkQ7kNvgG7etTV&_nc_ht=scontent.fdad1-3.fna&oh=00_AYAo2YOo6R_tLoSQrsJF64UQ5EaM4av44BhaDqwTtOhFnA&oe=666E5F57',
                            created_at: '2022-05-11T10:50:12.000000Z',
                            comment: 'this is a comment',
                        },
                        {
                            name: 'John Doe',
                            image_url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/365120153_3332590973717802_2390387319335403871_n.jpg?stp=dst-jpg_p480x480&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEjVLT0-I_uLGz9cnm1Q4Ao-ISRkwI191n4hJGTAjX3WbvlPBqV4VrhTuricRcPRrLziqlJt3M2TgNgXwRCvIJM&_nc_ohc=NBRNM2pYLNkQ7kNvgG7etTV&_nc_ht=scontent.fdad1-3.fna&oh=00_AYAo2YOo6R_tLoSQrsJF64UQ5EaM4av44BhaDqwTtOhFnA&oe=666E5F57',
                            created_at: '2022-05-11T10:50:12.000000Z',
                            comment: 'this is a comment',
                        },
                        {
                            name: 'John Doe',
                            image_url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/365120153_3332590973717802_2390387319335403871_n.jpg?stp=dst-jpg_p480x480&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEjVLT0-I_uLGz9cnm1Q4Ao-ISRkwI191n4hJGTAjX3WbvlPBqV4VrhTuricRcPRrLziqlJt3M2TgNgXwRCvIJM&_nc_ohc=NBRNM2pYLNkQ7kNvgG7etTV&_nc_ht=scontent.fdad1-3.fna&oh=00_AYAo2YOo6R_tLoSQrsJF64UQ5EaM4av44BhaDqwTtOhFnA&oe=666E5F57',
                            created_at: '2022-05-11T10:50:12.000000Z',
                            comment: 'this is a comment',
                        },
                        {
                            name: 'John Doe',
                            image_url: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/365120153_3332590973717802_2390387319335403871_n.jpg?stp=dst-jpg_p480x480&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEjVLT0-I_uLGz9cnm1Q4Ao-ISRkwI191n4hJGTAjX3WbvlPBqV4VrhTuricRcPRrLziqlJt3M2TgNgXwRCvIJM&_nc_ohc=NBRNM2pYLNkQ7kNvgG7etTV&_nc_ht=scontent.fdad1-3.fna&oh=00_AYAo2YOo6R_tLoSQrsJF64UQ5EaM4av44BhaDqwTtOhFnA&oe=666E5F57',
                            created_at: '2022-05-11T10:50:12.000000Z',
                            comment: 'this is a comment',
                        },
                    ]}
                    renderItem={({ item }) => <CommentBlock comment={item} />}
                />

                <View className=" flex-row p-[6px] justify-between items-center bg-neutral-100 rounded-full w-full my-4">
                    <TextInput
                        onChangeText={() => { }}
                        placeholder="Write a comment..."
                        placeholderTextColor={"gray"}
                        className=" font-medium text-black tracking-wider p-3 py-1 w-[90%] "
                    />
                </View>

            </View>

        </Animated.View >
    )

}
export default Comment