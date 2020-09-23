import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import New from './src/components/new';

const NewRoute = () => <New type="new" />;

const TopRoute = () => <New type="top" />;

const JobRoute = () => <New type="job" />;

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'new', title: 'New Stories'},
    {key: 'top', title: 'Top Stories'},
    {key: 'job', title: 'Job'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    new: NewRoute,
    top: TopRoute,
    job: JobRoute,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
}
