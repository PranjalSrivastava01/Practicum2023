import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react';
import MarketComponent from '../Component/CustomItem'
import { ScrollView } from 'react-native-gesture-handler'
import { Appbar } from 'react-native-paper';
import firestore, { firebase } from '@react-native-firebase/firestore';

const MarketScreen = () => {
    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');
    const [cropList, setCropList] = useState([]);

    useEffect(() => {
        getDatabase();
    }, [getDatabase]);
    
    const getDatabase = async () => {
        try {
            const data1 = await firebase.firestore().collection('User1').get();
            let arr = data1.docs.map((doc) => {
                let obj = doc.data().crops;
                if(!obj) return [];
                for(let i=0; i<obj.length; i++) {
                    obj[i].name = doc._data.name;
                    obj[i].phoneno = doc._data.phoneno;
                }
                return obj;
            });
            // console.log(arr);
            let dataArr = [];
            let cnt=1;
            for(let i=0; i<arr.length; i++) {
                for(let j=0; j<arr[i].length; j++) {
                    let obj = arr[i][j];
                    obj.key = cnt;
                    cnt++;
                    dataArr.push(obj);
                }
            }
            console.log(dataArr);
            setCropList(dataArr);
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <>
        <Appbar.Header>
        <Appbar.Content title="Market Place" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
        <FlatList
            data={cropList}
            renderItem={(crop) => {
                return <MarketComponent obj = {crop.item} imageLink = {`../assets/crops/${crop.item.name}.jpg`}/>
            }}
        />
        {/* <ScrollView style={{backgroundColor:'#EFFFF8'}}>
            <MarketComponent></MarketComponent>
            <MarketComponent></MarketComponent>
            <MarketComponent></MarketComponent>
            <MarketComponent></MarketComponent>
            <MarketComponent></MarketComponent>
            <MarketComponent></MarketComponent>
        </ScrollView> */}
        </>
    )
}

export default MarketScreen

const styles = StyleSheet.create({})