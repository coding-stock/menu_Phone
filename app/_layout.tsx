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
         headerShown: false ,
      }}/>
      <Stack.Screen
      name = 'menu/home'
      options= {{
        headerShown: false
      }}
      />
      <Stack.Screen
      name='menu/cart'
      options={{
        headerTitle: "Cart"
      }}/>
    </Stack>
  );
}
