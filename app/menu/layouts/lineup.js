import {View , Text , ScrollView , StyleSheet, TouchableOpacity , Image} from 'react-native';
import {useState , useEffect} from 'react';
import { getMenuItems  } from '../data';
import { colors , Fonts} from '../theme';
import {createClient} from "@supabase/supabase-js";

export default function Lineup(){
    const supabase = createClient(
        'https://ncdabrjqxlqyrhljppvt.supabase.co',
        'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
      );
    
    const [selected , setSelected] = useState('Breakfast');
    const [categories , setCategories] = useState([]);
    const [items , setItems]= useState([]);
    const [displayed , setDisplayed] = useState([]);
    const cat = ['breakfast' , 'salads' , 'chicken' , 'bjfhdf' , 'djfhdfh'];
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await getMenuItems();
            const uniquecategory = [... new Set(data.map(item => item.category))];
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
    return(
        <View>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} >
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
       {displayed.map(item =>{
          const ImageUrl = supabase.storage
          .from('images')
          .getPublicUrl(item.image).data.publicUrl
           return(
           <ScrollView key={item.id} style={styles.box}>
           <Image  source = {{uri : ImageUrl}} style= {styles.image}></Image>
          <Text style= {styles.name}>{item.name}</Text> 
          <Text style= {styles.desc}>{item.description}</Text>
          <View style={styles.priceRow}>
  <Text style={styles.price}>{item.price}</Text>

  <TouchableOpacity><Image  source={require('../images/plus.png')}  resizeMode="contain" style={styles.icon} /></TouchableOpacity>
</View>

          </ScrollView>
           )
       })}
       </View> 
       
    )
}
const styles = StyleSheet.create({
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
  width: 30,
  height: 30,
  transform : "translateY(-40%)"
},


})