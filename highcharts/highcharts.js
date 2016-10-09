function styleHighcharts() {
  /**
   * Dark theme for Highcharts JS
   * @author Torstein Honsi
   */

  Highcharts.theme = {
     colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
     chart: {
        backgroundColor: {
           linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
           stops: [
              [0, '#2a2a2b'],
              [1, '#3e3e40']
           ]
        },
        style: {
           fontFamily: "sans-serif"
        },
        plotBorderColor: '#606063'
     },
     title: {
        style: {
           color: '#E0E0E3',
           textTransform: 'uppercase',
           fontSize: '20px'
        }
     },
     subtitle: {
        style: {
           color: '#E0E0E3',
           textTransform: 'uppercase'
        }
     },
     xAxis: {
        gridLineColor: '#707073',
        labels: {
           style: {
              color: '#E0E0E3'
           }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
           style: {
              color: '#A0A0A3'

           }
        }
     },
     yAxis: {
        gridLineColor: '#707073',
        labels: {
           style: {
              color: '#E0E0E3'
           }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
           style: {
              color: '#A0A0A3'
           }
        }
     },
     tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
           color: '#F0F0F0'
        }
     },
     plotOptions: {
        series: {
           dataLabels: {
              color: '#B0B0B3'
           },
           marker: {
              lineColor: '#333'
           }
        },
        boxplot: {
           fillColor: '#505053'
        },
        candlestick: {
           lineColor: 'white'
        },
        errorbar: {
           color: 'white'
        }
     },
     legend: {
        itemStyle: {
           color: '#E0E0E3'
        },
        itemHoverStyle: {
           color: '#FFF'
        },
        itemHiddenStyle: {
           color: '#606063'
        }
     },
     credits: {
        style: {
           color: '#666'
        }
     },
     labels: {
        style: {
           color: '#707073'
        }
     },

     drilldown: {
        activeAxisLabelStyle: {
           color: '#F0F0F3'
        },
        activeDataLabelStyle: {
           color: '#F0F0F3'
        }
     },

     navigation: {
        buttonOptions: {
           symbolStroke: '#DDDDDD',
           theme: {
              fill: '#505053'
           }
        }
     },

     // scroll charts
     rangeSelector: {
        buttonTheme: {
           fill: '#505053',
           stroke: '#000000',
           style: {
              color: '#CCC'
           },
           states: {
              hover: {
                 fill: '#707073',
                 stroke: '#000000',
                 style: {
                    color: 'white'
                 }
              },
              select: {
                 fill: '#000003',
                 stroke: '#000000',
                 style: {
                    color: 'white'
                 }
              }
           }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
           backgroundColor: '#333',
           color: 'silver'
        },
        labelStyle: {
           color: 'silver'
        }
     },

     navigator: {
        handles: {
           backgroundColor: '#666',
           borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
           color: '#7798BF',
           lineColor: '#A6C7ED'
        },
        xAxis: {
           gridLineColor: '#505053'
        }
     },

     scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
     },

     // special colors for some of the
     legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
     background2: '#505053',
     dataLabelsColor: '#B0B0B3',
     textColor: '#C0C0C0',
     contrastTextColor: '#F0F0F3',
     maskColor: 'rgba(255,255,255,0.3)'
  };

  // Apply the theme
  Highcharts.setOptions(Highcharts.theme);
}

var highchartsWidget = function (settings) {
  var self = this;
  var currentSettings = settings;
  var htmlElement;
  var data;
  var options;
  var chartHeight = 300;
  var chartWidth = 300;

  styleHighcharts();

  // called once (or after settings change)
  this.render = function (element) {
    //add the chart div to the dom
    var chartDiv = '<div style="height:' + currentSettings.chartHeight + 'px;width:' + currentSettings.chartWidth + 'px;"></div>';
    htmlElement = $(chartDiv);
    $(element).empty().append(htmlElement);
  }

  this.onSettingsChanged = function (newSettings) {
    currentSettings = newSettings;
  }

  function renderChart(data) {
    //console.log('render', data)
    htmlElement.empty();
    htmlElement.highcharts(data);
  }

  // called after render whenever a calculated value changes
  this.onCalculatedValueChanged = function (settingName, newValue) {
    if (settingName == 'data') {
      renderChart(newValue);
    }
    //   data = newValue;

    // if (settingName == 'options')
    //   options = newValue;

    //render the chart
    // htmlElement.empty();
    // htmlElement.highcharts();
  }

  this.onDispose = function () {
  }

  this.getHeight = function () {
    return Number(currentSettings.height);
  }

  this.onSettingsChanged(settings);
};

freeboard.loadWidgetPlugin({
  "type_name": "highchartsWidget",
  "display_name": "Highcharts",
  "fill_size": true,
  "external_scripts": [
    "https://code.highcharts.com/highcharts.js",
  ],
  "settings": [
    {
      "name": "data",
      "display_name": "Chart Data",
      "type": "calculated",
      "description": "The data to plot"
    },
    {
      "name": "chartHeight",
      "display_name": "Chart Height (px)",
      "type": "number",
      "default_value": 300,
      "description": "chart height in pixels"
    },
    {
      "name": "chartWidth",
      "display_name": "Chart Widgth (px)",
      "type": "number",
      "default_value": 300,
      "description": "chart width in pixels"
    },
    {
      "name": "height",
      "display_name": "Height Blocks",
      "type": "number",
      "default_value": 5,
      "description": "A height block is around 60 pixels"
    }
  ],
  newInstance: function (settings, newInstanceCallback) {
    newInstanceCallback(new highchartsWidget(settings));
  }
});
