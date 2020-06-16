# Transforms for Magic Script

Functions to easily apply transforms to a node.

----

<!-- ## Use

Include the transform folder in your `src` folder.

In the file you wish to use transforms:
`import { transform } from 'path/to/transform.js'`


---- -->

## Structure

Transforms can be applied using the following structure:
`transform[transformName](node, duration, end, curve, delay)`

For example:
`transform[translateX](node, 1000, .25, 'easeInOutQuad', 500)`
This function will
* Translate the X value of node
* Over a period of 1s
* From its current X position to .25m
* Using an easeInOutQuad curve
* After waiting for .5s

The `end` value accepts a single number or an array.
A single number will translate all axis together, while an array will allow you to manipulate all axes.

Multi-axis example:
`transform[translate](node, 1000, [.25, .125, 0], 'easeInOutQuad', 500)`
* This function will move the node from its current position to a final position of [.25, .125, 0]

----

## Transforms

### Translate
Translations move a node from their existing position to the specified end.

#### transform.translate(node, duration, end, curve, delay)

| Argument   | Type            | Required              | Example          |
| ---------- | --------------- | --------------------- | ---------------- |
| `node`     | lumin.Node      | Yes                   | UiButton         |
| `duration` | milliseconds    | Yes                   | 1000             |
| `end`      | array or number | Yes                   | [.1,.1,.1] or .1 |
| `curve`    | string of curve | No, default is linear | 'easeInOutExpo'  |
| `delay`    | milliseconds    | No, default is 0      | 5000             |

Note: If a single number is supplied for an end value it will apply along all axes

Examples:
`transform.translate(UiButton, 1000, [.1,.1,.1], 'easeInOutExpo', 5000)`
`transform.translate(UiButton, 1000, .1, 'easeInOutExpo', 5000)`


#### transform.translateX(node, duration, end, curve, delay)
| Argument   | Type             | Required              | Example         |
| ---------- | ---------------- | --------------------- | --------------- |
| `node`     | lumin.Node       | Yes                   | UiButton        |
| `duration` | milliseconds     | Yes                   | 1000            |
| `end`      | number in meters | Yes                   | .1              |
| `curve`    | string of curve  | No, default is linear | 'easeInOutExpo' |
| `delay`    | milliseconds     | No, default is 0      | 5000            |

Example:
`transfom.translateX(UiButton, 1000, .1, 'easeInOutExpo', 5000)`

#### transform.translateY(node, duration, end, curve, delay)
| Argument   | Type             | Required              | Example         |
| ---------- | ---------------- | --------------------- | --------------- |
| `node`     | lumin.Node       | Yes                   | UiButton        |
| `duration` | milliseconds     | Yes                   | 1000            |
| `end`      | number in meters | Yes                   | .1              |
| `curve`    | string of curve  | No, default is linear | 'easeInOutExpo' |
| `delay`    | milliseconds     | No, default is 0      | 5000            |

Example:
`transfom.translateY(UiButton, 1000, .1, 'easeInOutExpo', 5000)`

#### transform.translateZ(node, duration, end, curve, delay)
| Argument   | Type             | Required              | Example         |
| ---------- | ---------------- | --------------------- | --------------- |
| `node`     | lumin.Node       | Yes                   | UiButton        |
| `duration` | milliseconds     | Yes                   | 1000            |
| `end`      | number in meters | Yes                   | .1              |
| `curve`    | string of curve  | No, default is linear | 'easeInOutExpo' |
| `delay`    | milliseconds     | No, default is 0      | 5000            |

Example:
`transfom.translateZ(UiButton, 1000, .1, 'easeInOutExpo', 5000)`

### Scale

Scales adjust a node's dimension from their existing scale to the specified end.

#### transform.scale(node, duration, end, curve, delay)

| Argument   | Type            | Required              | Example          |
| ---------- | --------------- | --------------------- | ---------------- |
| `node`     | lumin.Node      | Yes                   | UiButton         |
| `duration` | milliseconds    | Yes                   | 1000             |
| `end`      | array or number | Yes                   | [.1,.1,.1] or .1 |
| `curve`    | string of curve | No, default is linear | 'easeInOutExpo'  |
| `delay`    | milliseconds    | No, default is 0      | 5000             |

Note: If a single number is supplied for an end value it will apply along all axes

Examples:
`transform.scale(UiButton, 1000, [.1,.1,.1], 'easeInOutExpo', 5000)`
`transform.scale(UiButton, 1000, .1, 'easeInOutExpo', 5000)`

#### transform.scaleX(node, duration, end, curve, delay)
| Argument   | Type             | Required              | Example         |
| ---------- | ---------------- | --------------------- | --------------- |
| `node`     | lumin.Node       | Yes                   | UiButton        |
| `duration` | milliseconds     | Yes                   | 1000            |
| `end`      | number           | Yes                   | .1              |
| `curve`    | string of curve  | No, default is linear | 'easeInOutExpo' |
| `delay`    | milliseconds     | No, default is 0      | 5000            |

Example:
`transfom.scaleX(UiButton, 1000, .1, 'easeInOutExpo', 5000)`

#### transform.scaleY(node, duration, end, curve, delay)
| Argument   | Type             | Required              | Example         |
| ---------- | ---------------- | --------------------- | --------------- |
| `node`     | lumin.Node       | Yes                   | UiButton        |
| `duration` | milliseconds     | Yes                   | 1000            |
| `end`      | number           | Yes                   | .1              |
| `curve`    | string of curve  | No, default is linear | 'easeInOutExpo' |
| `delay`    | milliseconds     | No, default is 0      | 5000            |

Example:
`transfom.scaleY(UiButton, 1000, .1, 'easeInOutExpo', 5000)`

#### transform.scaleZ(node, duration, end, curve, delay)
| Argument   | Type             | Required              | Example         |
| ---------- | ---------------- | --------------------- | --------------- |
| `node`     | lumin.Node       | Yes                   | UiButton        |
| `duration` | milliseconds     | Yes                   | 1000            |
| `end`      | number           | Yes                   | .1              |
| `curve`    | string of curve  | No, default is linear | 'easeInOutExpo' |
| `delay`    | milliseconds     | No, default is 0      | 5000            |

Example:
`transfom.scaleZ(UiButton, 1000, .1, 'easeInOutExpo', 5000)`

### Rotate

#### transform.rotate(node, duration, end, curve, delay)

| Argument   | Type                       | Required              | Example          |
| ---------- | -------------------------- | --------------------- | ---------------- |
| `node`     | lumin.Node                 | Yes                   | UiButton         |
| `duration` | milliseconds               | Yes                   | 1000             |
| `end`      | angles for xyz in degrees  | Yes                   | [0,90,0]         |
| `curve`    | string of curve            | No, default is linear | 'easeInOutExpo'  |
| `delay`    | milliseconds               | No, default is 0      | 5000             |

Note: If a single number is supplied for an end value it will apply along all axes

Example:
`transform.rotate(UiButton, 1000, [0,90,0], 'easeInOutExpo', 5000)`

----

## Curve Names

* `linear`
* `easeInQuad`
* `easeOutQuad`
* `easeInOutQuat`
* `easeInCubic`
* `easeOutCubic`
* `easeInOutCubic`
* `easeInQuart`
* `easeOutQuart`
* `easeInOutQuart`
* `easeInQuint`
* `easeOutQuint`
* `easeInOutQuint`
* `easeInSine`
* `easeOutSine`
* `easeInOutSine`
* `easeInExpo`
* `easeOutExpo`
* `easeInOutExpo`
* `easeInCirc`
* `easeOutCirc`
* `easeInOutCirc`

----

## ToDo:
* Update playground to define variables in device
* Add array specification for durations
* Add array specification for curves
* Add array specification for delays
* Allow end array to accept a `default` or `current` value
* Add single rotation transforms
