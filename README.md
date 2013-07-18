seajs-tree
============

A Sea.js plugin for parsing dependencies of CMD modules


Usage
-----

```html
<script src="path/to/sea.js"></script>
<script src="path/to/seajs-tree.js"></script>

<script>
seajs.tree(id, function(data){
  // Data like this: {{"name": "", children: [{"name": "", "uri": ""}], "uri": ""}
  // You can use data to create visualizations by D3 (https://github.com/mbostock/d3/)
});
</script>
```
