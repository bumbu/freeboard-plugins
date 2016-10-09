## Google Spaedsheets datasource

Google Spaedsheets datasource plugin for freeboard.io

### How to use

Get a public spreadsheet and get its key as explained [here](http://buglabs.tumblr.com/post/128201590116/simple-freeboard-data-storage-with-google-sheets).

All the data from spreadsheet will be stored into datasource object.
Column titles (lowercase) are used to group column data.

![image](https://cloud.githubusercontent.com/assets/171178/19224246/e2837f02-8e79-11e6-80cd-bb78a15ca6fd.png)

Let's say you named your datasource as `Stats` and your spreadsheet has a `total` column, then that data can be accessed as:

```js
datasources["Stats"]["total"] // [127, 250, 60]

datasources["Stats"]["total"][2] // get 3rd element from array
```
