import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Iteneraire = ({navigation}:any) => {
    const Maps = React.lazy(() => import('./maps'));
    navigation.navigate('Loading'); 

  return (
    
    <View>
      <Text>Iteneraire</Text>
    </View>
  )
}

export default Iteneraire

const styles = StyleSheet.create({})