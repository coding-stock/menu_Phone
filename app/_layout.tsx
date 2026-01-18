import { Stack } from 'expo-router';
import { Image , View } from 'react-native';
import { useFonts } from 'expo-font';
export default function Layout() {
    const [fontsLoaded] = useFonts({
    Fancy:  require('../assets/fonts/Elegant.ttf'),
    Elegant: require('../assets/fonts/cool.otf'),
    Roboto: require('../assets/fonts/robotto.ttf'),
    Text: require('../assets/fonts/text.ttf'),
    Google_Sans: require('../assets/fonts/GoogleSans.ttf')
    
  });

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen 
      name='index'
      options={{
         headerTitle: () => <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                source={require("../assets/images/honey_logo.png")}
                style={{ width: 120, height: 100, resizeMode: "contain" }}
              />
            </View>,
         headerStyle: { backgroundColor: "#000000" }
      }}/>
      <Stack.Screen
      name = 'menu/home'
      options= {{
        headerTitle: "Home"
      }}
      ></Stack.Screen>
      <Stack.Screen
       name= 'menu/menu'
       options={{
        headerTitle: 'Food Menu'
       }}
      />
      <Stack.Screen
      name='menu/menuD'
      options={{
        headerTitle: 'Drinks Menu'
      }}/>
    </Stack>
  );
}
