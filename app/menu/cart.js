import{ View , Text , StyleSheet , ScrollView , Image, TouchableOpacity, Linking, Alert} from 'react-native';
import { useLocalSearchParams , useRouter } from 'expo-router';
import { getMenuItems } from './data';
import { use, useEffect , useState } from 'react';
import {colors , Fonts} from './theme';
import {createClient} from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Footer from './footer';  
import AwesomeAlert from 'react-native-awesome-alerts';
export default function Cart(){
    
    const supabase = createClient(
            'https://ncdabrjqxlqyrhljppvt.supabase.co',
            'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
    );
    const {data} = useLocalSearchParams();
    const [cart , setCart] = useState([]);
    const [total , setTotal] = useState(0);
    const [count , setCount] = useState({});
    const [showAlert , setShowAlert] = useState(false)
    const router = useRouter();
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
const openWhatsApp = async ()=>{
  const phoneNumber= '+250784189910'
                 let message = `*-----------------My Order------------------*\n`
                 cart.forEach((item) =>{
                    message += `Item Name: *${item.name}*\n`
                    message += `Quantity: *${count[item.id]}*\n`
                    message += `Price: *${item.price} RWF* \n`
                    message += "____________________________________\n"
                 })
                 message += `\nTotal: *${total} RWF*\n`
                 message += "_______________________________________"
   const encodedMessage = encodeURIComponent(message);
   const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
   
   try{
     const check = await Linking.canOpenURL(whatsappUrl)
     if(check){
      await Linking.openURL(whatsappUrl);
      await AsyncStorage.removeItem('orderItems')
   await AsyncStorage.removeItem('quantity')
   await AsyncStorage.removeItem('cartCount')
   await AsyncStorage.removeItem('Total');
   router.push('/menu/home')
     }else{
      Alert.alert("WhatsApp Not Installed");
     }
   }catch(error){
     Alert.alert("Error" , error)
   }  
}
    return(
       <SafeAreaView style= {styles.container}>
        <ScrollView  contentContainerStyle={{ paddingBottom: 48 }}>
        <TouchableOpacity style={styles.backBg} onPress={()=>
          router.push('/menu/home')
        }>
        <Image style={styles.backbtn}  source={require('./images/left-arrow.png')}></Image>
        </TouchableOpacity>
           <View style={styles.title}>
                <Text style={styles.titleTxt}>Your Selection</Text>
           </View>
           <ScrollView style={styles.cart}>
            {cart.map(item =>{
               
                const ImageUrl = supabase.storage
                   .from('images')
                   .getPublicUrl(item.image).data.publicUrl
                 return (
                  <View key={item.id} style={{width:"100%"}}>
                   <View  style={styles.box}>
                     <Image source={{uri: ImageUrl}} style={styles.image} />
                     <View style={styles.orderTxt}>
                        <Text style={styles.name}>{item.name}</Text> 
                         
                         <Text style={styles.price}>{item.price?.toString()} RF</Text>
                            <View style={styles.count}>
                         <TouchableOpacity onPress={()=>{
                              decreases(item.id , item.price)
                                       
                         }} style={styles.btns}><Image resizeMode='contain' source={require('./images/minus.png')} style={[styles.countIcon , styles.minus]}></Image></TouchableOpacity>
                         <Text style={styles.countNum}>{count[item.id]}</Text>
                         <TouchableOpacity onPress={()=>{
                              
                             increase(item.id)
                         }} style={styles.btns}><Image resizeMode='contain' source={require('./images/plus.png')} style={[styles.countIcon , styles.add]}></Image></TouchableOpacity>
                           </View>
                      </View>
                   </View>
                         <View  style={{ marginTop: 15 ,width: "150%" , height: 2 , backgroundColor: colors.gray , marginTop: 20 , opacity: 0.3}}></View>
                   
                   </View>
            )})}
            </ScrollView>
            <View style={styles.payment}>
                     <View style={styles.subTotal}>
                        <Text style={[styles.payment_Txt , styles.payment_Txt_titles]}>Sub Total</Text>
                        <Text style={styles.payment_Txt}>{total} RF</Text>
                     </View>
                     
                     <View style={styles.subTotal}>
                         <Text style= {[styles.payment_Txt , {fontSize:25} ]}>Total</Text>
                         <Text style= {[styles.payment_Txt , {fontSize:27}]}>{total} RF</Text>
                     </View>
            </View>
            <TouchableOpacity style={[styles.checkout ,]} onPress={()=>{
                setShowAlert(true)
            }}>
                <Image resizeMode='contain' style={styles.whatsapp} source={require("./images/whatsapp.png")}></Image>
                <Text style={styles.totalPrice}>Continue to Whatsapp</Text>
            </TouchableOpacity>
        </ScrollView>
        <Footer style={styles.footer} screen={"store"} orderItems={cart} />

<AwesomeAlert
  show={showAlert}
  showProgress={false}
  title="Confirm Order"
  message="Are you sure you want to send this order? it cant be undone"
  closeOnTouchOutside={true}
  closeOnHardwareBackPress={false}
  showCancelButton={true}
  showConfirmButton={true}
  cancelText="Cancel"
  confirmText="Yes, Send"
  confirmButtonColor="#25D366"
  onCancelPressed={() => setShowAlert(false)}
  onConfirmPressed={() => {
    setShowAlert(false);
    openWhatsApp();
  }}
/>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({ 
  backBg:{
        padding: 10
    },
    backbtn:{
       width: 30,
       height: 30
    },
    title:{
       justifyContent: "center",
       alignItems: "center",
    },
    titleTxt:{
      color: "white",
      fontFamily: Fonts.Google,
      fontSize: 40
    },
   container:{
         backgroundColor: colors.box_color,   
         flex: 1 
    },
    cart:{
      flexDirection: "row",
      flexWrap: 'wrap',
      padding: 10,
    },
    box:{
      width: "98%",
      margin: '1%',
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 10
  },
    
  image:{
     borderRadius:10,
     marginBottom: 10,
     width: 100,
     height: 100
  },
  name:{
    color: "white",
    fontFamily: Fonts.Google,
    fontSize: 20,
    textTransform: "capitalize",
    padding: 5
  },
  price:{
    color: colors.orange,
    fontFamily: Fonts.Google,
    fontSize: 16,
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
  alignItems: "center",
  marginTop: 'auto',
  alignItems: "center",
  width: 120,
  borderRadius: 20,
  backgroundColor: colors.box_color_light,
},
countNum:{
  borderRadius: 10,
  textAlign: 'center',
  fontSize: 18,
  height: 30,
  alignSelf: "center",
  color: "white"
},
countIcon:{
  width: 30,
},
minus:{
  height: 25
},
add:{
 height:20
},
btns:{
  padding: 5
},
checkout:{
  width: "100%",
  backgroundColor: "green",
  height: 80,
  flexDirection: "row",
  justifyContent: "center",
  alignItems:"center",
  borderRadius: 20
},
totalPrice:{
  fontSize: 30,
  fontFamily:Fonts.Roboto,
  color:"white"
},
whatsapp:{
  width: 40,
  marginRight: 20
},
subTotal:{
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 10,
  marginBottom: -20
},
payment_Txt:{
  color: "white",
  fontFamily: Fonts.Google,
  fontSize: 20
},
payment_Txt_titles:{
  color: colors.gray
}
})