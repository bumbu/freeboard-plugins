window.dyngaugeID = 0;
(function() {
    var dynamicGaugeWidget = function (settings) {
        var self = this;
        var thisDynGaugeID = "dyngauge-" + window.dyngaugeID++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var gaugeElement = $('<div id="' + thisDynGaugeID + '"></div>');

        var gaugeObject;
        var rendered = false;

        var currentSettings = settings;
        var currentValues = {
            value: 0,
            min_value: 0,
            max_value: 0,
            level_colors: ['#f45b5b', '#f9c802', '#a9d70b', '#55BF3B'],
        };

        function createGauge() {
            if (!rendered) {
                return;
            }

            gaugeElement.empty();

            gaugeObject = new JustGage({
                id: thisDynGaugeID,
                value: currentValues.value,
                min: currentValues.min_value,
                max: currentValues.max_value,
                label: currentSettings.units,
                showInnerShadow: false,
                valueFontColor: "#d3d4d4",
                levelColors: currentValues.level_colors,
            });
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append($('<div class="gauge-widget-wrapper"></div>').append(gaugeElement));
            createGauge();
        }

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.units != currentSettings.units) {
                currentSettings = newSettings;
                createGauge();
            }
            else {
                currentSettings = newSettings;
            }

            titleElement.html(newSettings.title);
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            currentValues[settingName] = newValue;
            if (!_.isUndefined(gaugeObject)) {
                if (settingName == 'value') {
                    gaugeObject.refresh(Number(newValue));
                } else {
                    createGauge();
                }
            }
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {
            return 3;
        }

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: "dyngauge",
        display_name: "DynamicGauge",
        "external_scripts" : [
            "/freeboard-ui/plugins/thirdparty/raphael.2.1.0.min.js",
            "/freeboard-ui/plugins/thirdparty/justgage.1.0.1.js"
        ],
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
            {
                name: "value",
                display_name: "Value",
                type: "calculated"
            },
            {
                name: "units",
                display_name: "Units",
                type: "text"
            },
            {
                name: "min_value",
                display_name: "Minimum",
                type: "calculated",
                default_value: 0
            },
            {
                name: "max_value",
                display_name: "Maximum",
                type: "calculated",
                default_value: 100
            },
            {
                name: "level_colors",
                display_name: "Level colors",
                type: "calculated",
                default_value: "return ['#f45b5b', '#f9c802', '#a9d70b', '#55BF3B']"
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new dynamicGaugeWidget(settings));
        }
    });

}());
