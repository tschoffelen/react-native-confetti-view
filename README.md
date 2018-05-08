# Confetti View

![Screenshot](screenshot.png)


## Installation

Using NPM:

```
npm i react-native-confetti-view
```

Using Yarn:

```
yarn add react-native-confetti-view
```


### Usage

Also, see the [example directory](example).

```js
import React from 'react'
import { Text } from 'react-native'
import ConfettiView from '../index'

export default class MyView extends React.Component {
  render () {
    return (
      <ConfettiView>
        <Text>Hi!</Text>
      </ConfettiView>
    )
  }
}
```
