import { Text , View} from "native-base"
import Ionicons from '@expo/vector-icons/Ionicons';

const PostItem = () => {
    return (
        <View className="flex flex-col bg-slate-400 w-full">
            <View>Header</View>
            <Text>Hi</Text>
            <View>
                <View className="h-full flex flex-row gap-2 mx-0 my-0">
                    <Ionicons name="md-checkmark-circle" size={24} color="green" />
                </View>
            </View>
        </View>
    )
}

export default PostItem