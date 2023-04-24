import { Text, View } from "native-base"

const PostItem = () => {
    return (
        <View className="flex flex-col bg-slate-400 w-full">
            <View>Header</View>
            <Text>Hi</Text>
            <View>actions</View>
        </View>
    )
}

export default PostItem