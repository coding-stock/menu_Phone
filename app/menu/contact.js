import{ View , Text , StyleSheet , TouchableOpacity , Image, Linking} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colors , Fonts} from './theme'
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Footer from './footer'
export default function Contact(){
    const router = useRouter()
    const handleCall = ()=>{
        Linking.openURL('tel:0784189910');
    }
    const handleEmail = ()=>{
        Linking.openURL('mailto:alimaboyi@gmail.com');
    }
    return(
        <SafeAreaView style={styles.container}>
         <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
           <View style={styles.navbar}>
              <TouchableOpacity style={styles.backBtn} onPress={()=>{
                router.back()
              }}><Image resizeMode='contain' source={require('./images/left-arrow.png')} style={styles.backImg}/></TouchableOpacity>
              <Text style={styles.navbarText}>Location & Contact</Text>
              <View></View>
              <View></View>
           </View>
           <View style={styles.location}>
            <Text style={styles.location_text}>Visit the Estate</Text>
            <Text style={styles.location_sub_text}>Experience fine dinig in the heart of the city.</Text>
            <TouchableOpacity style={styles.mapContainer} onPress={()=>{
                
                    router.push('https://www.google.com/maps/place/Honey+Restaurant/@-1.9421826,30.0537453,17z/data=!4m6!3m5!1s0x19dca422a18d2f2d:0x7c8056d4d6553fef!8m2!3d-1.9421826!4d30.0563202!16s%2Fg%2F11c46k9qp5?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D')
            }}><Image resizeMode='cover' source={require('./images/map.png')} style={styles.map}/>
            </TouchableOpacity>
            <View style={styles.direction}>
                <Image style={styles.directionicon} source={require('./images/location-pin.png')} resizeMode='contain'/>
                <View style={styles.directiontexts}>
                    <Text style={{color:"white" , fontFamily: Fonts.Jet_Brains , fontSize: 20}}>Adress</Text>
                    <Text style={{color:colors.gray , fontFamily: Fonts.Google , fontSize: 16}}>Kigali, Muhima KN 2 Ave </Text>
                </View>
                <TouchableOpacity style={styles.directionbtn} ><Text style={styles.direction_btn_text} onPress={()=>{
                    router.push('https://www.google.com/maps/place/Honey+Restaurant/@-1.9421826,30.0537453,17z/data=!4m6!3m5!1s0x19dca422a18d2f2d:0x7c8056d4d6553fef!8m2!3d-1.9421826!4d30.0563202!16s%2Fg%2F11c46k9qp5?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D')
                }}>Direction</Text></TouchableOpacity>
            </View>
           </View>
           <View style={styles.hours_of_operation}>
              <Text style={styles.hours_of_operation_title}>Hours of Operation</Text>
              <View style={styles.hours_of_operation_body}>
                <Text style={styles.hours_of_operation_days}>Monday - Sunday</Text>
                <Text style={styles.hours_of_operation_time}>7:00 AM - 10:00 PM</Text>
              </View>
           </View>
             <Text style={{color: "white" , fontSize: 25 , fontFamily: Fonts.Google , marginLeft: 10 }} >Direct Contact</Text>
           <View style={styles.contact}> 
               <TouchableOpacity style={styles.button} onPress={handleCall}><Image resizeMode='contain' style={styles.icon} source={require('./images/phone.png')}/><Text style={styles.contact_text}>Call us Now</Text></TouchableOpacity>
               <TouchableOpacity style={styles.button} onPress={handleEmail}><Image resizeMode='contain' style={styles.icon} source={require('./images/email.png')}/><Text style={styles.contact_text}>Call us Now</Text></TouchableOpacity>
           </View>
           </ScrollView>
           <Footer screen= "cart"/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    contact:{
       flexDirection: "row",
       justifyContent:"space-around",
    },
    contact_text:{
        color:"white",
        fontFamily: Fonts.Google,
        fontSize:18,
        marginTop: -30
    },
    icon:{
       width: 40
    }
    ,button:{
       justifyContent: "center",
       alignItems:"center",
       backgroundColor: "#0e1316",
       width: 150,
       borderRadius:10,
    }
    ,hours_of_operation_days:{
        color:colors.gray,
        fontFamily: Fonts.Google,
        fontSize:17
    }
    ,hours_of_operation_time:{
        color: "white",
        fontSize:17,
        fontFamily: Fonts.Google
    }
    ,hours_of_operation_body:{
        flexDirection: 'row',
        justifyContent: "space-between",
    }
    ,hours_of_operation_title:{
       color:"white",
       fontFamily: Fonts.Google,
       fontSize: 25,
       marginBottom: 30
    }
    ,hours_of_operation:{
       marginTop: 40,
       padding: 10,
       marginBottom: 40
    }
    ,direction_btn_text:{
        fontSize: 18,
        fontFamily: Fonts.Jet_Brains
    },
    directionbtn:{
        backgroundColor: colors.orange,
        padding: 10,
        paddingLeft:10,
        paddingRight:10,
        borderRadius: 10
    },
    directionicon:{
        width: 35
    }
    ,direction:{
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems:"center",
       backgroundColor: colors.box_color_light,
       padding:10,
       height:70,
       borderRadius:20
    },
    map:{
        width: "100%",
        borderRadius: 10,
        marginTop: -130,
    },
    mapContainer:{
        width: 365,
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom:20
    }
    ,location_text:{
       color: "white",
       fontFamily: Fonts.Google,
       fontSize: 30
    },
    location_sub_text:{
       color: colors.gray,
       fontFamily: Fonts.Google,
       fontSize: 18
    },

    container:{
        backgroundColor: colors.box_color,
        flex: 1,
        padding: 10
    },
    navbar:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    backImg:{
        width: 30,
    },
    navbarText:{
        fontFamily: Fonts.Google,
        color: "white",
        fontSize: 25
    }
})