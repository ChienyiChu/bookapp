import React from 'react';
import { useState } from 'react';
import { Box,Image, Text, Pressable } from '@gluestack-ui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import WishlistScreen from '../screens/WishlistScreen';
import MybookScreen from '../screens/MybookScreen';
import AccountScreen from '../screens/AccountScreen';
import SettingtScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        height={48}
        width={48}
        marginLeft={16}
        marginTop={40}
        marginBottom={16}
        source={require("../image/img_avatar.png")}
        alt='AccountImage'
      />
      <Text fontWeight='500' fontSize={24} marginLeft={16} marginBottom={17}>
        May
      </Text>
      <Box backgroundColor='#EDEDEF' height={1} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        drawerStyle: { width: 300 },
        drawerActiveBackgroundColor: 'white',
        drawerInactiveTintColor:'#666666',
        drawerActiveTintColor: '#6200EE',
        headerTitleStyle: {
          fontWeight: '400',
          fontSize: 20
        },
        drawerLabelStyle: { fontSize: 14, fontWeight: '400' },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          headerShown: false,
          title: "Home",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={ color }  size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="AccountStack"
        component={AccountScreen}
        options={{
          title: "Account",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={ color } size={26} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingtScreen}
        options={{
          title: "Settings",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={ color } size={26} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: '#6200EE',
        tabBarStyle: { height: 56 }
        //headerShown:false
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: "Wishlist",
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 20
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mybook"
        component={MybookScreen}
        options={{
          title: "Mybook",
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 20
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-open" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = ({ navigation }) => {
  const [toggle, setToggle] = useState(true);
  const toggleFunction = () => {
    setToggle(!toggle);
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <MaterialCommunityIcons
              name={'menu'}
              size={20}
              onPress={() => navigation.openDrawer()}
              style={{ marginRight: 20 }}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name={'magnify'}
              size={28}
            />
          )
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <MaterialCommunityIcons
              name={'chevron-left'}
              size={30}
              onPress={() => navigation.goBack(null)}
              style={{ marginLeft: 0 }}
            />
          ),
          headerRight: () => (
            <Pressable onPress={() => toggleFunction()}>
              {toggle ? <MaterialCommunityIcons name={'bookmark-outline'} color={'black'} size={26} /> :
                <MaterialCommunityIcons name={'bookmark'} color={'#6200EE'} size={26} />}
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}



export default Navigation;