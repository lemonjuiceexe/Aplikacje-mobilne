import { Text, View } from "react-native";

export default function Item({
    text,
    wrapperStyle
}){
    return (
        <View style={wrapperStyle}>
            <Text style={{fontSize: 32}}>{text}</Text>
        </View>
    );
}
