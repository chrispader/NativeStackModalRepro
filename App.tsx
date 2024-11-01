import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {Button, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>

      <Button
        title="Go to second screen"
        onPress={() => navigation.navigate('SecondScreen')}
      />
    </View>
  );
}

function SecondScreen() {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = React.useState(false);

  const hideModalAndNavigateBack = useCallback(() => {
    setIsVisible(false);
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'cyan',
      }}>
      <Text>Second Screen</Text>

      <Button title="Open modal" onPress={() => setIsVisible(true)} />
      <Button
        title="Go to modal screen"
        onPress={() => navigation.navigate('ModalScreen')}
      />
      {/* <Button title="Open modal" onPress={hideModalAndNavigateBack} /> */}

      <ReactNativeModal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationInTiming={300}
        animationOut="slideOutDown"
        animationOutTiming={300}
        style={{
          flex: 1,
          margin: 0,
          padding: 0,
          marginTop: 500,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <Button
          title="Close and navigate back"
          onPress={hideModalAndNavigateBack}
        />
      </ReactNativeModal>
    </View>
  );
}

function ModalScreen() {
  const navigation = useNavigation();

  const navigateBack = useCallback(() => {
    navigation.dispatch(StackActions.pop(2));
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        margin: 0,
        padding: 0,
        marginTop: 500,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <Text>Modal Screen</Text>

      <Button title="Close and navigate back" onPress={navigateBack} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen
          name="ModalScreen"
          component={ModalScreen}
          options={{presentation: 'transparentModal', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
