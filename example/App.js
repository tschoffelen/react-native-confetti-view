import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ConfettiView from '../index'

type Props = {};
export default class App extends Component<Props> {
  render () {
    return (
      <ConfettiView>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Confetti!
          </Text>
          <Text style={styles.instructions}>
            {'Thomas spent his day building \nthis. That either means Thomas \nhas a great or a terrible life.'}
          </Text>
        </View>
      </ConfettiView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fece43',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    lineHeight: 20
  }
})
