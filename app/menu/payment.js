import { View , Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState , useEffect} from 'react';
import { getMenuItems } from './data';
export default function Payment(){
   const [stored , setStored] = useState([]); 
   const [total , setTotal] = useState(0);
    useEffect(()=>{
     const fetchData = async()=>{
       const data = await getMenuItems();
       const stored = await AsyncStorage.getItem('orderItems');
       const total =   await AsyncStorage.getItem('Total');
       const parsed = JSON.parse(stored)
       const filtered = data.filter( item => parsed.some(p => p.id === item.id));
       setStored(filtered);
       setTotal(total)
     }
     fetchData()
    }, [])
    return(
        <>
       { stored.map(item => (
            <View key={item.id}>
                <Text>{item.name}</Text>
            </View>
        ))}
        <View>
            <Text>{total}</Text>
        </View>
        </>
    )
}