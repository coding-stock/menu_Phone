import { Stack } from 'expo-router';
import { Image , View } from 'react-native';

export default function Layout() {
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
         headerStyle: { backgroundColor: "#080808f9" }
      }}/>
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
