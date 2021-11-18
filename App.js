import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Animated } from 'react-native';
import profile from './src/assets/profile.png';
// Tab icons
import home from './src/assets/home.png';
import search from './src/assets/search.png';
import notifications from './src/assets/bell.png';
import settings from './src/assets/settings.png';
import logout from './src/assets/logout.png';
//menu
import menu from './src/assets/menu.png';
import close from './src/assets/close.png';

//photo
import photo from './src/assets/photo.jpg';


export default function App() {

  const [currentTab, setCurrentTab] = useState('Home');
  const [showMenu, setShowMenu] = useState(false);

  // Animated

  const offsetValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(1)).current
  const closeButtonOffset = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{ marginTop: 8, width: 60, height: 60, borderRadius: 10 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 20 }}>Jenna Ezarik</Text>

        <TouchableOpacity>
          <Text style={{ marginTop: 6, color: 'white' }}>View profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Home" image={home} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Search" image={search} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Notifications" image={notifications} />
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="Settings" image={settings} />
        </View>

        <View>
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} title="LogOut" image={logout} />
        </View>

      </View>

      <Animated.View style={{
        flexGrow: 1, backgroundColor: 'white', position: 'absolute', top: 0, right: 0,
        bottom: 0, left: 0, paddingHorizontal: 15, borderRadius: showMenu ? 15 : 0,
        paddingVertical: 20, transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            }).start()

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 220,
              duration: 300,
              useNativeDriver: true
            }).start()

            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            }).start()

            setShowMenu(!showMenu)
          }} >
            <Image source={showMenu ? close : menu} style={{ width: 20, height: 20, tintColor: 'black', marginTop: 40, }} />
          </TouchableOpacity>
        </Animated.View>

        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingTop: 20 }}>{currentTab}</Text>
        <Image source={photo} style={{ width: '100%', height: 300, borderRadius: 15, marginTop: 20 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 15, paddingBottom: 5 }}>Jenna Ezarik</Text>
        <Text style={{}}>Techie, YouTuber, PS Lover, Apple Sheep's Sister</Text>

      </Animated.View>

    </SafeAreaView>
  );
}

const TabButton = ({ currentTab, setCurrentTab, title, image }) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title === 'LogOut') {

      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, backgroundColor: currentTab === title ? 'white' : 'transparent', borderRadius: 8, paddingLeft: 13, paddingRight: 35, marginTop: 15 }}>
        <Image source={image} style={{ width: 25, height: 25, tintColor: currentTab === title ? '#5359d1' : 'white' }} />
        <Text style={{ fontSize: 15, fontWeight: 'bold', paddingLeft: 15, color: currentTab === title ? '#5359d1' : 'white' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
