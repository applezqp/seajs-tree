(function(seajs){
  var tree, metalist;

  seajs.tree = function(id, callback) {
    tree = null;
    metalist = [];
    seajs.on('define', buildMeta);
    seajs.use(id, function(){
      seajs.off('define', buildMeta);
      callback(tree); 
    });
  };

  function buildMeta(meta) {
    if(!seajs.cache[meta.uri]) {
      metalist.push(meta);
      return;
    }
    
    addMeta(meta);
    
    var m, l = metalist.length;

    for(var i = 0; i < l; i++){
      var m = metalist.shift();
      if(seajs.cache[m.uri]) {
        addMeta(m);
      } else {
        metalist.push(m);
      }
    }
  }

  function addMeta(meta) {
    var node = { name: meta.id, uri: meta.uri};

    if(meta.deps.length) {
      node.children = [];
      for(var i=0, l=meta.deps.length; i<l; i++) {
        node.children.push({name: meta.deps[i], uri: seajs.resolve(meta.deps[i], meta.uri)});
      }
    }

    if(!tree) {
      tree = node
      return;
    }
    
    if(!meta.deps.length) return;

    var target = findNode(tree, node.uri);
    target.children || (target.children = []);
    target.children = target.children.concat(node.children);
  }

  function findNode(root, uri) {
    var data = root.children;

    if(!(data && data.length)) return root;

    var stack = data.slice();
    while(node = stack.shift()) {
      if(node.uri == uri) {
        return node;
      } else if(node && node.children && node.children.length) {
        stack = stack.concat(node.children);
      }
    }
    return root;
  }
  
  define("seajs-combo-tree", [], {});
})(seajs)
