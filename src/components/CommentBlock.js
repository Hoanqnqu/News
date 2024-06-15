import React from 'react';
import { Image, Text, View } from 'react-native';

import moment from 'moment';

const CommentBlock = ({ comment }) => {
    return (
        <View className="w-full"  >
            <View
                className="flex flex-row items-center gap-4 py-4 w-full"
            >
                <Image
                    source={{
                        uri:
                            comment.image_url,
                    }}
                    style={{
                        width: 46,
                        height: 46,
                        borderRadius: 50,
                        backgroundColor: '#5E5D5E',
                        paddingHorizontal: 12,
                    }}
                />

                <View className="w-full">
                    <Text
                        class="font-serif text-base text-gray-900 dark:text-neutral-300"
                    >
                        {comment.name}
                    </Text>
                    <Text
                        className="text-gray-900 dark:text-neutral-300 w-full"
                    >
                        {comment.comment}

                    </Text>
                    <Text
                        className="text-xs text-gray-500 w-full pt-1"
                    >
                        {moment(comment.created_at).format('ll')}
                    </Text>
                </View>
            </View>

        </View>
    );
};

export default CommentBlock;