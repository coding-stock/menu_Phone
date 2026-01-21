import{ View , Text , StyleSheet , ScrollView , Image, TouchableOpacity} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getMenuItems } from './data';
import { use, useEffect , useState } from 'react';
import {colors , Fonts} from './theme';
import {createClient} from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Cart(){
    
    const supabase = createClient(
            'https://ncdabrjqxlqyrhljppvt.supabase.co',
            'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
    );
    const {data} = useLocalSearchParams();
    const [cart , setCart] = useState([]);
    const [total , setTotal] = useState(0);
    const [count , setCount] = useState({});
    useEffect( ()=>{
        const fetchData = async ()=> {
        const data = await getMenuItems();
        const storedOrders = await AsyncStorage.getItem('orderItems');
const parsed = storedOrders ? JSON.parse(storedOrders) : [];

        const cartItems = data.filter(item => parsed.some(p => p.id === item.id));
        setCart(cartItems)   
        

     const storedQty = await AsyncStorage.getItem('quantity');
    const parsedQty = storedQty ? JSON.parse(storedQty) : {};
    const initialCount = {};

    cartItems.forEach(item => {
      initialCount[item.id] = parsedQty[item.id] ?? 1;
    });
    setCount(initialCount);
  };
    fetchData() },[])
    
  const decreases = (id) => {
  setCount(prev => {
    const newQty = (prev[id] || 1) - 1;

    if (newQty <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));

      const updated = { ...prev };
      delete updated[id];
      removeFromStorage(id);
      return updated;
    }
    return {
      ...prev,
      [id]: newQty,
    };
  });
};
const removeFromStorage = async (id) => {
  try {
    const stored = await AsyncStorage.getItem('orderItems');
    if (!stored) return;

    const parsed = JSON.parse(stored);

    const updated = parsed.filter(item => item.id !== id);

     AsyncStorage.setItem('orderItems', JSON.stringify(updated));
  } catch (err) {
    console.log('AsyncStorage remove error:', err);
  }
};

    const increase = (id) => {
  setCount(prev => ({
    ...prev,
    [id]: prev[id] + 1,
  }));
};
useEffect(() => {
  if (!cart.length) return;

  let newTotal = 0;

  cart.forEach(item => {
    newTotal += item.price * count[item.id];
  });

  setTotal(newTotal);
  AsyncStorage.setItem('quantity', JSON.stringify(count));
}, [count, cart]);

    return(
        <ScrollView style= {styles.container}>
           <View style={styles.cart}>
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
                       <View style={styles.count}>
                         <TouchableOpacity onPress={()=>{
                              decreases(item.id , item.price)
                                       
                         }} style={styles.btns}><Image resizeMode='contain' source={require('./images/minus.png')} style={[styles.countIcon , styles.minus]}></Image></TouchableOpacity>
                         <Text style={styles.countNum}>{count[item.id]}</Text>
                         <TouchableOpacity onPress={()=>{
                              
                             increase(item.id)
                         }} style={styles.btns}><Image resizeMode='contain' source={require('./images/plus.png')} style={styles.countIcon}></Image></TouchableOpacity>
                       </View>
                       </View>
            )})}
            </View>
            <View style={styles.checkout}>
                <Text style={styles.totalPrice}>Checkout:{total}</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
         backgroundColor: colors.box_color,    
    },
    cart:{
      flexDirection: "row",
      flexWrap: 'wrap',
      padding: 10,
    },
    box:{
      width: '48%',
      margin: '1%',
      backgroundColor: colors.box_color_light,
      borderRadius: 10,
  },
  image:{
     borderRadius:10,
     marginBottom: 10,
     height: 200,
  },
  name:{
    color: "white",
    fontFamily: Fonts.Roboto,
    fontSize: 20,
    textTransform: "capitalize",
    padding: 5
  },
  desc:{
    color: colors.gray,
    fontFamily: Fonts.Google,
    fontSize: 14,
    padding: 5
  },
  price:{
    color: "white",
    fontFamily: Fonts.Roboto,
    fontSize: 20,
    padding: 5
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
count:{
  flexDirection: "row",
  justifyContent:"space-between",
  marginTop: 'auto',
  padding: 10,
  alignItems: "center"
},
countNum:{
  backgroundColor: colors.gray,
  width: "30%",
  borderRadius: 10,
  textAlign: 'center',
  fontSize: 25,
  height: 30,
  alignSelf: "center",
},
countIcon:{
  width: 20
},
minus:{
  height: 30
},
btns:{
  padding: 10
},
checkout:{
  width: "100%",
  backgroundColor: colors.orange,
  height: 80 ,
  paddingLeft: 10,
},
totalPrice:{
  fontSize: 30,
  fontFamily:Fonts.Google
}
})