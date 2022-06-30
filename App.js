import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = ()=> {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle((oldToggle) => !oldToggle)

  useEffect(()=>{
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(()=>{
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(()=>{
      setToggle((oldToggle) => !oldToggle)
    });

    // Essa função vai ser chamada quando o componente for desmontado
    return () => subscription.remove();
  },[]);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleCHangeToggle}>
        <Image 
          style={toggle ? style.lightningOn : style.lightningOff}
          source={
            toggle 
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
            }
        />
        <Image 
          style={style.dioLogo}
          source={
            toggle 
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')
            }
          />
        </TouchableOpacity>
    </View>
  );
};

export default App

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex:1,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightningOn:{
    resizeMode: 'contain',
    alightSelf: 'center',
    width: 150,
    height: 150,
  },
  lightningOff:{
    resizeMode: 'contain',
    alightSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo:{
    resizeMode: 'contain',
    alightSelf: 'center',
    width: 250,
    height: 250,
  },
});