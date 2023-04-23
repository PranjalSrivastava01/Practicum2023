import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import StoryBox from '../Component/StoryBox';
import MyComponent from './AddStoryPage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {AnimatedFAB, FAB, Portal, TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { database } from 'firebase-functions/v1/firestore';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [extended, setExtended] = useState(true);
  const [blogList, setBlogList] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const user = await firebase.auth().currentUser.uid;
      const data = await firestore().collection('User1').doc(user).get();
      setName(data._data.name);
      // setBlogList(data1[name]);
      const data1 = await firestore().collection('global').doc('allUserTweets').get();

      setBlogList(data1._data.tweet);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  const updateDataBase = async (blogItem) => {
    try {
      let list1 = blogList;
      list1.push({text: blogItem, name:name, key: (list1.length+1)});
      setBlogList(list1);
      await firestore().collection('global').doc('allUserTweets').update({tweet: blogList}).then(()=> {console.log('Tweet Added')});
    }
    catch(err) {
      console.log(err);
    }
  }

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setExtended(currentScrollPosition <= 0);
  };
  const route = useRoute();

  // const updateList = (blogItem) => {
  //   setBlogList([...blogList, {text: blogItem, name:name, key: (blogList.length+1)}]);
  //   // console.log(blogList);
  //   updateDataBase();
  // }

  const handleClick = () => {
    navigation.navigate('AddStoryPage', {upd: updateDataBase, name:name});
  };

  // console.log(route?.params)
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={blogList}
        renderItem={(blog1) => {
          return <StoryBox blog={blog1.item.text} name={blog1.item.name} />
        }} 
      />
      <AnimatedFAB
        color="white"
        icon={'plus'}
        label={'Tweet'}
        extended={extended}
        onPress={handleClick}
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle]}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    backgroundColor: '#0dbd71',
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
