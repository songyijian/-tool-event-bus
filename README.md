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

```js
import EventBus from 'tools-event-bus'

const evbus = new EventBus('name')

const f1 = a => console.log(a)
const f2 = (...a) => console.log(a)

/* Listener */
evbus.once('eventName', f1)
evbus.on('eventName', f2)

/* Handler */
evbus.emit('eventName', 'args', '...n')

/* Off */
evbus.off('eventName')

```
