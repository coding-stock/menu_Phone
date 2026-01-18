import {View , Text, StyleSheet, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { colors , Fonts } from '../theme';
import { useFonts } from 'expo-font';
import { getMenuItems } from '../data';
import { createClient } from '@supabase/supabase-js';
import { useState , useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function Navbar(){
    const [items , setItems] = useState([])
    const [img , setImg] = useState(null)
      const supabase = createClient(
        'https://ncdabrjqxlqyrhljppvt.supabase.co',
        'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
      );
    
    useEffect(()=>{
        const fetchData = async () => {
            const data = await getMenuItems();
            setItems(data);
            if(data.length > 0){
                const firstItem = data.find(item => item.name === "Lemon Chicken Salad" )
                const imageUrl = supabase.storage
            .from('images')
            .getPublicUrl(firstItem.image).data.publicUrl;
            setImg(imageUrl);
            }

        };
        fetchData();
    }, []);
    return(
        <View style={styles.all}>
        <View style={styles.nav}>
             <Image resizeMode='contain' style={styles.icon} source={require('../images/icon_deli.png')} ></Image>
            <Text style={styles.logo}>HONEY RESTAURANT</Text>
            <Text></Text>
        </View>
        <View style={styles.img}>
        <ImageBackground
        source={{uri: img}}
        style={styles.imageBackground}>
               <LinearGradient
    colors={['transparent', '#0b0e10']}
    style={styles.gradient}
  >
         <Text style={[styles.text , styles.featured]}>Featured Selection</Text>
         <Text style={[styles.text , styles.title]}>The Chef's Signature</Text>
         <Text style={[styles.text, styles.yap]}>A journey through seasonal textures and avant-garde preparation</Text>
         <TouchableOpacity style={styles.btn}><Text style={[ styles.btn_text]} >EXPLORE</Text></TouchableOpacity>
    </LinearGradient>
        </ImageBackground>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    all:{
       justifyContent:"center",
       alignItems: "center"
    },
    nav:{
       width: "100%",
       backgroundColor: colors.box_color,
       height :30,
       alignItems: "center",
       justifyContent: "center",
       borderBottomColor: "black",
       flexDirection: "row",
       borderBottomWidth: 1,
    },
    logo:{
        fontFamily: Fonts.Elegant,
        color: colors.text,
        fontSize: 28,
    },
    img:{
         width: "100%",
         padding: 10,
    },
    imageBackground:{
      width:"100%",
      height: 400,
      overflow: 'hidden',
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      justifyContent: "flex-end",
    },
    icon:{
        display: "none",
    },
    text:{
        color: "white",
        paddingLeft:20,
        fontSize: 18,
        fontFamily: Fonts.Roboto,
    },
    featured:{
        color: colors.orange,
        fontFamily: Fonts.Fancy,
        fontSize: 35,
    },
    title:{
        fontSize:55,
    },
    yap:{
       color: colors.gray,
       width: "70%",
       marginBottom: 10
    },
    gradient:{
        height: 60,
        width: "100%",
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    btn:{
       backgroundColor: colors.orange,
       alignSelf: 'flex-start',
       marginLeft: 20,
       paddingLeft: 20,
       paddingRight: 20,
       padding: 10,
       borderRadius: 30
    },
    btn_text:{
       fontSize: 16,
       fontFamily: Fonts.Roboto
    }

})