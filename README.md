# Setting Up VisSnippets

First, install the SAGE2 Software. Information can be found here: [SAGE2 Instructions](http://sage2.sagecommons.org/instructions/)

### SAGE2 Configuration

To enable VisSnippets, you'll need to update your SAGE2 config file. In the file, add an `experimental` section at the bottom of the file in the format seen below.

Make sure that you set the `enabled` flag to `true`. The `external_dependencies` section specifies an array of URLs to libraries which you would like to load into SAGE2 for use with VisSnippets. By default, D3v4 is included. The list below was used during the creation of both example applications. If you choose to add other dependencies, make sure they add themselves to the `window` object so they can be referenced globally by your snippets.

```json
{ 
  ... 
  "experimental": {
    "vissnippets": {
      "enabled": true,
      "external_dependencies": [
        "https://cdn.jsdelivr.net/npm/vega@3",
        "https://cdn.jsdelivr.net/npm/vega-lite@2",
        "https://cdn.jsdelivr.net/npm/vega-embed@3",
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/92/three.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js",
        "https://cdn.plot.ly/plotly-latest.min.js",
        "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
      ]
    }
  } 
   ...
 }
```

# Using VisSnippets

The VisSnippets editor can be accessed through the Snippet Editor button in the SAGE2 Web UI. From there, you can write and edit your Snippets.

## Snippets Declarative APIs

These APIs are designed to declaratively provide additional functionality to your Snippets. A basic call can be added to your code using the [**+ API Call**] dropdown in the VisSnippets Editor.

### `SAGE2.SnippetVisElement`

This call will provide a DOM element reference to one of your "Draw" snippets, along with its current width and height. The format is as follows:

```js
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "svg" });
```

### `SAGE2.SnippetTimeout`

This call allows you to specify that VisSnippets run your code at a specified interval. The format is as follows:

```js
SAGE2.SnippetTimeout({ time: 5000 }); // 5s timeout
```

### `SAGE2.SnippetInput`

This call will create an input element to your code which can be updated from the SAGE2 wall by clicking the gears icon. The format is as follows:

```js
let yAttr = SAGE2.SnippetInput({
  name: "Y Attribute", // name your input element
  type: "text",
  defaultVal: "count", // an *optional* default value for the input
});
```

## Exporting and Viewing Analysis

Clicking the Export Project button in the editor will download a .json file which can be viewed at the following link.

[Snippets Notebook Viewer](https://andrewtburks.dev/snippets-notebook/)