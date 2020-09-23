import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {
  ActivityIndicator,
  Card,
  Colors,
  Divider,
  Paragraph,
  Title,
} from 'react-native-paper';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addData} from '../action';
import RootState from '../store';

interface PageProps {
  foo: string;
  bar: string;
}

export default function New(props: {type: string}) {
  const dispatch = useDispatch();
  const HackerNewsApiV0 = 'https://hacker-news.firebaseio.com/v0/';
  const HackerNewsApi = {
    topStories: HackerNewsApiV0 + 'topstories.json',
    newStories: HackerNewsApiV0 + 'newstories.json',
    showStories: HackerNewsApiV0 + 'showstories.json',
    askStories: HackerNewsApiV0 + 'askstories.json',
    jobStories: HackerNewsApiV0 + 'jobstories.json',
    post: HackerNewsApiV0 + 'item/${postId}.json',
  };
  const [isFetching, setIsFetching] = useState(false);
  const dataReducer = useSelector(
    (state: typeof RootState) => state.dataReducer,
  );
  const {data} = dataReducer;
  useEffect(
    () => getData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const getData = () => {
    setIsFetching(true);
    let url = HackerNewsApi.newStories;
    switch (props.type) {
      case 'new':
        url = HackerNewsApi.newStories;
        break;
      case 'top':
        url = HackerNewsApi.topStories;
        break;
      case 'job':
        url = HackerNewsApi.jobStories;
        break;
    }
    axios
      .get(url)
      .then((res) => {
        let gotData: any[] = [];
        for (let i = 0; i < 20; i++) {
          var post = res.data[i];
          axios
            .get(HackerNewsApi.post.replace('${postId}', post))
            .then((gotPost) => {
              gotData.push(gotPost.data);
              dispatch(addData(gotData));
            })
            .finally(() => {
              setIsFetching(false);
            });
        }
      })
      .catch((err) => Alert.alert(err));
  };

  const renderItem = ({item, index, separators}) => {
    return (
      <TouchableHighlight key={item.id} onPress={() => {}}>
        <View style={{backgroundColor: 'white'}}>
          <Card>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>By : {item.by}</Paragraph>
            </Card.Content>
          </Card>
          <Divider />
        </View>
      </TouchableHighlight>
    );
  };

  const styles = StyleSheet.create({
    activityIndicatorContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: 'grey',
    },
  });

  //Render
  if (isFetching) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
    );
  } else {
    return (
      <View
        style={{backgroundColor: '#F5F5F5', flex: 1, flexDirection: 'column'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `flat_${index}`}
        />
      </View>
    );
  }
}
