import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { FlatList, TextInput, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommentBlock from '../CommentBlock';
import { fetchComments, postComment } from '../../utils/Comment';
import { useMutation } from '@tanstack/react-query';
const Comment = ({ newsID }) => {

    const [comments, setComments] = useState();

    const [count, setCount] = useState(0)
    const [text, setText] = useState('');
    const fetchComment = async () => {
        const res = await fetchComments(newsID);
        setComments(res);
        setCount(res?.length || 0);
    };

    const { mutate } = useMutation(
        {
            mutationFn: postComment,
            onSuccess: () => {
                fetchComment();
                setText('');
            },
            onError: (error) => {
                setText('');
                console.log(error);
            }
        });

    useEffect(() => {
        fetchComment();
    }, [newsID]);
    useEffect(() => {
        fetchComment()
        setText('')
    }, [newsID])

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
                <Text className="text-lg font-bold text-black">{count} comments</Text>

                <FlatList className="w-full flex h-full"
                    showsVerticalScrollIndicator={false}
                    data={comments}
                    renderItem={({ item }) => <CommentBlock comment={item} />}
                />

                <View className="flex-row justify-center items-center mx-5 ml-14">
                    <View className=" flex-row p-[6px] justify-between items-center bg-neutral-100 rounded-full w-full my-4 mr-3 ">
                        <TextInput
                            value={text}
                            onChangeText={(a) => { setText(a) }}
                            placeholder="Write a comment..."
                            placeholderTextColor={"gray"}
                            className=" font-medium text-black tracking-wider p-3 py-1 w-[90%] "
                        />

                    </View>
                    <TouchableOpacity onPress={() => {
                        mutate({
                            comment: text,
                            news_id: newsID
                        })
                    }} >
                        <Text
                            className="text-white bg-slate-600 px-4 py-2 text-sm rounded-full  "
                        >
                            Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Animated.View >
    )

}
export default Comment