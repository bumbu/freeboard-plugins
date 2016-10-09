var googleSheets = function (settings, updateCallback) {
  var self = this;
  var currentSettings = settings;
  var currentTimeout;
  var dataset = {};

  function convertToJSON(value) {
    var stArray = value.split(', ');
    var obj = {};
    for (var i in stArray) {
        var sig = stArray[i].split(": ");
        obj[sig[0]] = sig[1];
    }
    return obj;
  }

  function nextTick() {
    currentTimeout = setTimeout(self.updateNow.bind(self), currentSettings.refresh * 1000);
  }

  function stopTimeout() {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
    }
  }

  function processEntries(entries) {
    if (_.isArray(entries) && entries.length > 0) {
      // Get headers
      var firstValues = convertToJSON(entries[0].content.$t);
      var headers = ['title'];
      for (var key in firstValues) {
        headers.push(key);
      }

      // Init headers
      var header;
      for (header of headers) {
        dataset[header] = [];
      }

      var entry;
      for (var i = 0; i < entries.length; i++) {
        entry = convertToJSON(entries[i].content.$t);

        for (header of headers) {
          dataset[header][i] = entry[header] || null;
        }
      }
    } else {
      dataset = {}
    }

    //console.log(dataset);
    updateCallback(dataset);
  }

  this.updateNow = function () {
    stopTimeout();
    var currUrl = "https://thingproxy.freeboard.io/fetch/https://spreadsheets.google.com/feeds/list/"+currentSettings.sheet_key+"/"+currentSettings.worksheet_id+"/public/basic?alt=json";
    $.ajax({
      url: currUrl,
      dataType: (currentSettings.is_jsonp) ? "JSONP" : "JSON",
      success: function (data) {
        var entries = data.feed.entry;

        processEntries(entries);
        nextTick();
      },
      error: function (xhr, status, error) {
        nextTick();
      }
    });
  }

  this.onDispose = function () {
    stopTimeout();
  }

  this.onSettingsChanged = function (newSettings) {
    currentSettings = newSettings;
    self.updateNow();
  }
};

freeboard.loadDatasourcePlugin({
  "type_name": "googleSheets",
  "display_name": "Google Sheet Data",
  "settings": [
    {
      "name": "sheet_key",
      "display_name": "Sheet Ket",
      "type": "text",
      "description": ""
    },
    {
        "name":"worksheet_id",
        "display_name":"Worksheet ID",
        "type":"text",
        "default_value":"default"
    },
    {
      name: "is_jsonp",
      display_name: "Is JSONP",
      type: "boolean",
      "default_value": false
    },
    {
      "name": "refresh",
      "display_name": "Refresh Every",
      "type": "number",
      "suffix": "seconds",
      "default_value": 600
    }
  ],
  newInstance: function (settings, newInstanceCallback, updateCallback) {
    newInstanceCallback(new googleSheets(settings, updateCallback));
  }
});
