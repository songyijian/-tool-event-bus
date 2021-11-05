# tools-event-bus

> Publish subscribe tool

## Installation

```shell
# npm
npm install tools-event-bus

# yarn
yarn add tools-event-bus

# Browserify
<script src="../dist/toolsEventBus.iife.js"></script>
```

## Usage

ES6

```js
import EventBus from 'tools-event-bus'

const evbus = new EventBus('You can give bus name')

const f1 = a => console.log(a)
const f2 = (...a) => console.log(a)

/* Listener */
evbus.once('eventName', f1)
evbus.on('eventName', f2)

/* Handler */
evbus.emit('eventName', 'args', '...n')

/* Off */
evbus.off('eventName', f1)
evbus.off('eventName') // Clear current event list
evbus.off() // Clear all event list
```

Browserify

```js
var EventBus = window.toolsEventBus
var myEventBus = new EventBus('You can give bus name')
```
