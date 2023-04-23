import * as React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Avatar, Button, Card, Text, View,Provider} from 'react-native-paper';
import {BackHandler, ScrollView, StyleSheet} from 'react-native';
import Theme from '../assests/Theme/theme1'
import {useState} from 'react';
const LeftContent = props => <Avatar.Icon {...props} icon='folder' />;
import CustomItem from '../Component/CustomItem';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function MyComponent() {
  const navigation = useNavigation();
  const route = useRoute();
  const [blog, setBlog] = useState('');

  const updateBlog = (text) => {
    setBlog(text);
  }

  const updatePage = () => {
    route?.params.upd(blog);
    navigation.goBack();
  }

  return (
    <Provider theme={Theme}>
    <Card style={styles.container}>
      <Card.Title
        title={route?.params.name}
        variant="titleLarge"
        left={LeftContent}
      />
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={'always'}>
        <TextInput
          placeholder="What's Happening!!"
          autoFocus={true}
          style={styles.tweetArea} onChangeText={updateBlog}></TextInput>
      </ScrollView>
      <Card.Actions>
        <Button onPress={() => navigation.goBack()}>Cancel</Button>
        <Button onPress={updatePage}>Post</Button>
      </Card.Actions>
    </Card>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tweetArea: {
    marginBottom: 200,
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 15,
  },
});
