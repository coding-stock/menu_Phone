import{ View , Text , StyleSheet , ScrollView , Image} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getMenuItems } from './data';
import { useEffect , useState } from 'react';
import {colors , Fonts} from './theme';
import {createClient} from "@supabase/supabase-js";
export default function Cart(){
    
    const supabase = createClient(
            'https://ncdabrjqxlqyrhljppvt.supabase.co',
            'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
    );
    const {data} = useLocalSearchParams();
    const [cart , setCart] = useState([]);
    const [total , setTotal] = useState([]);
    const  parsed = data ? JSON.parse(data) : [];
    useEffect( ()=>{
        const fetchData = async ()=> {
        const data = await getMenuItems();
        const cartItems = data.filter(item => parsed.some(p => p.id === item.id));
        setCart(cartItems)   
        const price = cartItems.reduce((sum , item) => sum + item.price, 0)
        setTotal(price)
    }
    fetchData() },[])
    return(
        <ScrollView style= {styles.container}>
            {cart.map(item =>{
               
                const ImageUrl = supabase.storage
                   .from('images')
                   .getPublicUrl(item.image).data.publicUrl
                 return (
                   <View key={item.id} style={styles.box}>
                     <Image source={{uri: ImageUrl}} style={styles.image} />
                     <Text style={styles.name}>{item.name}</Text> 
                     <Text style={styles.desc}>{item.description}</Text>
                       <Text style={styles.price}>{item.price?.toString()}</Text>
                       </View>
            )})}
            <View>
                <Text>{total}</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
         backgroundColor: colors.box_color
    },
    box:{
      
      padding: 20
  },
  image:{
     width: "100%",
     borderRadius:10,
     marginBottom: 10,
     height: 200,
  },
  name:{
    color: "white",
    fontFamily: Fonts.Roboto,
    fontSize: 20,
    textTransform: "capitalize"
  },
  desc:{
    color: colors.gray,
    fontFamily: Fonts.Google,
    fontSize: 14,
    width: '80%'
  },
  price:{
    color: colors.orange,
    fontFamily: Fonts.Elegant,
    fontSize: 20
  },
  priceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
icon: {
  width: 80,
  height: 80,
  transform : "translateY(-40%)"
},

})