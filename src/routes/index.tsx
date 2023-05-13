import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";

const {Navigator, Screen} = createNativeStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer> 
            <Navigator initialRouteName="Home" screenOptions={{
                orientation: "portrait"
            }}>
                <Screen name="Home" component={Home} 
                    options={{
                        headerTitle: 'Jogo da forca',
                        headerTitleAlign: "center"
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}