import { View , Text , StyleSheet} from 'react-native';
import { colors } from './theme';
export default function Footer(){
    return(
        <View style= {styles.container}>
            <View style={styles.circle}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
  backgroundColor: "white",
  width: "100%",
  height: 50,

  position: "absolute",
  bottom: 0,
  left: 0,

  justifyContent: "center",
  alignItems: "center",
},

    circle:{
        backgroundColor: colors.orange,
        width: 50,
        height: 50,
        borderRadius: "50%",
        marginTop: -50
    }
})