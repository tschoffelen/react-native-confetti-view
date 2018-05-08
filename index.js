import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'

const MONEY_DIMENSIONS = {width: 50, height: 50}
const SCREEN_DIMENSIONS = Dimensions.get('window')
const WIGGLE_ROOM = 320

const colors = [
  '#e67e22', // carrot
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#84AAC2',
  '#E6D68D',
  '#F67933',
  // '#343417',
  '#42A858',
  '#4F50A2', // wisteria
  '#A86BB7',
  '#e74c3c', // alizarin
  '#1abc9c' // turquoise
//  '#2c3e50' // midnight blue
]

const FlippingView = ({back = false, delay, duration = 5000, style = {}}) => (
  <Animatable.View
    animation={{
      from: {rotateX: back ? '0deg' : '180deg', rotate: !back ? '180deg' : '0deg'},
      to: {rotateX: back ? '360deg' : '-180deg', rotate: !back ? '180deg' : '0deg'}
    }}
    duration={duration}
    delay={delay}
    easing="linear"
    iterationCount="infinite"
    useNativeDriver
    style={{
      ...style,
      backfaceVisibility: 'hidden'
    }}
  />
)

const Swinging = ({amplitude, rotation = 14, delay, duration = 4000, children}) => (
  <Animatable.View
    animation={{
      0: {
        translateX: -amplitude * Math.random() * 4,
        translateY: -amplitude * 0.5,
        rotate: `${rotation}deg`
      },
      0.5: {
        translateX: 0,
        translateY: amplitude * 0.1,
        rotate: '0deg'
      },
      1: {
        translateX: amplitude * Math.random() * 4,
        translateY: -amplitude * 0.5,
        rotate: `${-rotation}deg`
      }
    }}
    delay={delay}
    duration={duration}
    direction="alternate"
    easing="ease-in-out"
    iterationCount="infinite"
    useNativeDriver
  >
    {children}
  </Animatable.View>
)

const Falling = ({duration, delay, style, children}) => (
  <Animatable.View
    animation={{
      from: {translateY: -MONEY_DIMENSIONS.height - WIGGLE_ROOM},
      to: {translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM}
    }}
    duration={duration}
    delay={delay}
    easing={t => Math.pow(t, 1.7)}
    iterationCount="infinite"
    useNativeDriver
    style={style}
  >
    {children}
  </Animatable.View>
)

const randomize = max => Math.random() * max

const range = count => {
  const array = []
  for (let i = 0; i < count; i++) {
    array.push(i)
  }
  return array
}

export default class ConfettiView extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    duration: PropTypes.number
  }

  static defaultProps = {
    count: 96,
    duration: 6400
  }

  render () {
    const {count, duration} = this.props

    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        {range(count)
          .map(i => randomize(1000))
          .map((flipDelay, i) => {
            const size = Math.random() * 10 + 16
            const style = {
              width: size,
              height: size,
              backgroundColor: colors[Math.round(Math.random() * colors.length)],
              opacity: Math.min(1, Math.random() + 0.5),
              borderRadius: Math.random() > 0.5 ? 20 : 0
            }

            return (
              <Falling
                key={i}
                duration={duration}
                delay={i * (duration / count)}
                style={{
                  position: 'absolute',
                  zIndex: 10000,
                  paddingHorizontal: WIGGLE_ROOM,
                  left: randomize(SCREEN_DIMENSIONS.width - MONEY_DIMENSIONS.width) - WIGGLE_ROOM
                }}
              >
                <Swinging amplitude={MONEY_DIMENSIONS.width / 2} delay={randomize(duration)}>
                  <FlippingView style={style} delay={flipDelay + i * (duration / count)}/>
                  <FlippingView
                    delay={flipDelay + i * (duration / count)}
                    back
                    style={{position: 'absolute', ...style}}
                  />
                </Swinging>
              </Falling>
            )
          })}
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
