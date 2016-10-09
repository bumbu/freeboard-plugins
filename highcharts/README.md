## Highcharts widget

[Highcharts.js](http://www.highcharts.com/) widget plugin for freeboard.io.
Uses dark theme.

### How to use

Chart data field should return a [Highcharts settings object](http://api.highcharts.com/highcharts).

An example would be

```js
return {
  xAxis: {
    type: "datetime",
    tickInterval: 24 * 3600 * 1000,
    labels: {
      enabled: true
    },
    plotLines: [{
      value: Date.now(),
      color: 'yellow',
      dashStyle: 'shortdash',
      width: 2,
      label: {
          text: 'today',
          style: {
            color: 'white'
          }
      }
    }]
  },

  series: [{
    name: 'Real',
    data: [[1472515200000, 0], [1472601600000, 19], [1472688000000, 21]]
  }, {
    name: 'Expected',
    data: [[1472515200000, 0], [1472601600000, 5], [1472688000000, 10]]
  }]
}
```

An example of a Highchart graph looks like:

![image](https://cloud.githubusercontent.com/assets/171178/19224288/f4b70350-8e7a-11e6-8f22-a743fd41331b.png)
