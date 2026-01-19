import {View , Text , ScrollView , StyleSheet, TouchableOpacity , Image} from 'react-native';
import {useState , useEffect , useRef} from 'react';
import { getMenuItems  } from '../data';
import { colors , Fonts} from '../theme';
import {createClient} from "@supabase/supabase-js";
import { useRouter} from 'expo-router';
export default function Lineup({ setOrderItems }){
    const route = useRouter();

   
       const supabase = createClient(
        'https://ncdabrjqxlqyrhljppvt.supabase.co',
        'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
      );
    const scrollReset = useRef(null);
    const [selected , setSelected] = useState('Breakfast');
    const [categories , setCategories] = useState([]);
    const [items , setItems]= useState([]);
    const [displayed , setDisplayed] = useState([]);
    const [menuType , setMenuType] = useState('food');
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await getMenuItems();
            const filtered = data.filter(item => item.Isdrink == null);
            const uniquecategory = [... new Set(filtered.map(item => item.category))];
            
            setCategories(uniquecategory);
            setItems(data);
                if (uniquecategory.length > 0) {
                    setSelected(uniquecategory[0]);
                    setDisplayed(data.filter(food => food.category === uniquecategory[0]));
    }     
        }
        fetchData()
    }, [])
    useEffect(()=>{
        setDisplayed(items.filter(food => food.category === selected))
    } , [selected , items])

    const resetScrollFunc = ()=>{
      scrollReset.current?.scrollTo({x: 0 , animated: true})
    }
    const addToCart = (id , name) =>{
      const newItem = {
        id: id,
        name: name,
      }
       setOrderItems(prevItems => [...prevItems , newItem]);
    }
    return(
        <View>
        <View style={styles.menuCategory}>
          <TouchableOpacity onPress={
            ()=>{
              resetScrollFunc()
              setMenuType('food')
              const filtered = items.filter(item => item.Isdrink == null);
              const uniquecategory = [... new Set(filtered.map(item => item.category))];
              setCategories(uniquecategory);
              if (uniquecategory.length > 0) {
                    setSelected(uniquecategory[0]);
                    setDisplayed(items.filter(food => food.category === uniquecategory[0]));
    }  
            }
          } style={[styles.btn, menuType === 'food' && styles.activeBox]} key={"butt"}><Text style={[styles.btn_text , menuType === 'food' && styles.activeBoxText]}>Food</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{
              setMenuType('Drinks')
              resetScrollFunc()
              const filtered = items.filter(item => item.Isdrink == true);
              const uniquecategory = [... new Set(filtered.map(item => item.category))];
              setCategories(uniquecategory);
              if (uniquecategory.length > 0) {
                    setSelected(uniquecategory[0]);
                    setDisplayed(items.filter(food => food.category === uniquecategory[0]));
    }  
          }} style={[styles.btn, menuType != 'food' && styles.activeBox]}><Text style={[styles.btn_text , menuType != 'food' && styles.activeBoxText]}>Beverages</Text></TouchableOpacity>
        </View>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollReset} >
        {categories.map(item=>(
            <TouchableOpacity key={item} 
            onPress={
                ()=>{
                    setSelected(item)
                }
            } style={[
              styles.categoryItem,
              selected === item && styles.activeItem
            ]}
 ><Text style= {[styles.text, selected === item && styles.activeText]}> {item} </Text></TouchableOpacity>
        ))}
       </ScrollView>  
       {displayed.map(item => {
  const ImageUrl = supabase.storage
    .from('images')
    .getPublicUrl(item.image).data.publicUrl
  return (
    <View key={item.id} style={styles.box}>
      <Image source={{uri: ImageUrl}} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text> 
      <Text style={styles.desc}>{item.description}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price?.toString()}</Text>
        <TouchableOpacity onPress={()=>{
           addToCart(item.id , item.name)
        }}>
          <Image source={require('../images/plus.png')} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
})}
       </View> 
       
    )
}
const styles = StyleSheet.create({
   activeBox:{
     backgroundColor: colors.orange
   },
   activeBoxText:{
    color: colors.box_color
   },
    menuCategory:{
      flexDirection: "row",
      justifyContent: "space-around"
    },
    btn_text:{
      color: colors.box_color_light_lighter,
      fontSize: 20,
      textAlign: "center",
      fontFamily: Fonts.Text
    },
    btn:{
      backgroundColor: colors.box_color_light,
      padding: 20,
      width: "40%",
      borderRadius: 20,
      marginBottom: 30,
    },
   categoryItem: {
    paddingHorizontal: 25,
    paddingVertical: 0,
    color: "white",
    justifyContent:"center",
    alignItems: "center"
  },
  text:{
    color: "white",
    fontFamily: Fonts.Google,
    fontSize: 18,
  },
  activeText:{
    color: colors.orange
  },
  activeItem: {
    borderBottomColor: colors.orange,
    borderBottomWidth: 1,
    borderRadius: 30 
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