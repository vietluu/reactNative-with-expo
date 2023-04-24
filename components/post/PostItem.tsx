import { Icon, Text, View } from "native-base"

const PostItem = () => {
    return (
        <View className="flex flex-col bg-slate-400 w-full">
            <View>Header</View>
            <Text>Hi</Text>
            <View>
                <View className="h-full flex flex-row gap-2">
                    <Icon name="home" size={6} className="mx-0"/>
                    <Icon name="plus" size={6}/>
                    <Icon name="plus" size={6}/>
                </View>
            </View>
        </View>
    )
}

export default PostItem