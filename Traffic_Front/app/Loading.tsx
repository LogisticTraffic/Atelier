import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, Suspense } from 'react';
const Loading = () => {
    const Maps = React.lazy(() => import('./Map/maps'));
  return (
    <View style={styles.container}>
     <Suspense fallback={<Text>.....Loading...</Text>}>
             <Maps />
           </Suspense>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})