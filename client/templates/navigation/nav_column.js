Template.nav_column.rendered = function (){

  // a function to build a tree node for a steuergerät and and its block
  function buildBlock(block){
    _logClient('Building tree block');
    // var block_array = new Array();
    _logClient('Block name: ' + block.name );
    var caf_block = {
      text: block.name,
      version: block.version,
      date: _getTimeString(block.date),
      changed_by: _getUserName(block.changed_by),
      i_stufe: block.i_stufe,
      release:	block.release,
      address: block.address,
      bytes: block.bytes,
      aktivierungs_bedingungen: block.aktivierungs_bedingungen,
      node_type: 'block'
    };

    if(block.functions != null && typeof block.functions != 'undefined' && block.functions.length > 0) {

      caf_block.nodes = new Array();
      for(var i=0; i<block.functions.length; i++) {
        var elem = block.functions[i];
        console.log('Element name: ' + elem.name );
        var caf_block_temp = {
          text: elem.name,   //AIRConditioning
          start_byte: elem.start_byte,
          end_byte: elem.end_byte,
          mask: elem.mask,
          obd_relevant: elem.obd_relevant,
          special_value: elem.special_value,
          node_type: 'function',
          nodes: buildParametersNode(elem)
        };

        caf_block.nodes.push(caf_block_temp);
      }
    }

    //  block_array.push(caf_block);
    _logClient(block.name);
    // return block_array;
    return caf_block;
  }

  // a function to build a tree node for parameters such as aktiv, nicht aktiv, Linsensor etc.
  function buildParametersNode(node){

    if(node.parameters != null && typeof node.parameters!= 'undefined' && node.parameters.length > 0) {

      var parameters_node = new Array();
      for(var i=0; i<node.parameters.length; i++) {
        var elem = node.parameters[i];
        _logClient('Param name: ' + elem.name );
        var parameter_block_temp = {
          text: elem.name,
          code_value: elem.code_value,
          brv: elem.brv,
          node_type: 'variant',
        };

        parameters_node.push(parameter_block_temp);
      }
    }

    _logClient(node.name);
    return parameters_node;
  }


  _logClient("layout rendered");

  function getUserComponentBlocks() {

    var components = Meteor.user().profile.components;
    _logClient("User Components: " + components);

    var tempComponentsBlocks = new Array();
    var userComponents = new Array();

    components.forEach(function(comp){
      var componentProporties = s.words(comp, "_");  //splices string to two words
      if(!_.contains(userComponents, componentProporties[0]))
        userComponents.push(componentProporties[0]);
    });

    userComponents.forEach(function(userComp){
      var compObj = {
        componentId : userComp,
        componentBlocks : new Array()
      };
      components.forEach(function(comp){
        var componentProporties = s.words(comp, "_");
        if(userComp == componentProporties[0])
          compObj.componentBlocks.push(componentProporties[1]);
      });
      tempComponentsBlocks.push(compObj);
    });

    _logClient("User Components: " + JSON.stringify(tempComponentsBlocks));


    return tempComponentsBlocks;
  }


  // Some logic to retrieve, or generate tree structure
  function getTree() {

    var searched_i_stufe = Session.get("searched_i_stufe" );
    var searched_release = Session.get("searched_release" );

    //use instead with dependency getUserComponentBlocks!----
    var components = Meteor.user().profile.components;

    if(components == null || typeof components == 'undefined' || components.length == 0)
      return null;

    _logClient("User Components: " + components);

    var userComponents = new Array();
    var query = new Array();

    components.forEach(function(comp){
      var componentProporties = s.words(comp, "_");  //splices string to two words
      var componentId = componentProporties[0];

      //make a list of all component Ids
      if(!_.contains(userComponents, componentId))
        userComponents.push(componentId);

      //prepare mongo query
      var queryItem = {
        name: componentProporties[1],
        steuergeraet_id : componentId,
        trunk:true
      };

      if(searched_release != null && typeof searched_release != 'undefined' && searched_release.length>0)
        queryItem.release=searched_release;
      else
        _.omit(queryItem, 'release' );
      if(searched_i_stufe != null && typeof searched_i_stufe != 'undefined' && searched_i_stufe.length>0)
        queryItem.i_stufe=searched_i_stufe;
      else
        _.omit(queryItem, 'i_stufe' );

      _logClient("CAF query" + JSON.stringify(queryItem));

      query.push(queryItem);
    });

    // var caf = CAF.find({name: 'AirConditioning', steuergeraet_id:'BDC2015', version: 12});
    var caf = CAF.find( {$or: query } );

    if(caf.count()){

   //   throwSuccess("CAFs updated");
      // var one = _.first(caf.fetch());
      var cafBlocks = caf.fetch();
      var tree_array = new Array();

      userComponents.forEach(function(userComp){
        var cafExist = false;
        var tree_array_item = {
          text : userComp, //one.steuergeraet_id,
          node_type: 'component', //BDC2015
          nodes : new Array()
        };

        cafBlocks.forEach(function(one){
          if(one.steuergeraet_id == userComp){
            cafExist = true;
            tree_array_item.nodes.push(buildBlock(one));
          }            
        });
        if(cafExist)
          tree_array.push(tree_array_item);
      });
      return tree_array;
    }
  }

  //eventhandler for treeView
  var selectedEvent = function(event, data) {
    Session.set(
      "node_title", data.text
    );
    Session.set(
      "node_type", data.node_type
    );
    _logClient('data: ' + JSON.stringify(data));

    if(data.node_type == "variant")
    {
      Session.set("code_value", data.code_value );
    }
    else if(data.node_type == "function"){
      var functionProperties = {
        start_byte :data.start_byte,
        end_byte:data.end_byte,
        mask:data.mask,
        obd_relevant:data.obd_relevant,
        special_value:data.special_value
      };
      Session.set("function_properties", functionProperties);
    }else if(data.node_type == "block"){
      var functionProperties = {
        version: data.version,
        date: data.date,
        changed_by: data.changed_by,
        i_stufe: data.i_stufe,
        release:	data.release,
        address: data.address,
        bytes :data.bytes,
      };
      Session.set("aktivierungs_bedingungen", data.aktivierungs_bedingungen);
      Session.set("function_properties", functionProperties);
    }

    if(data.nodes != null &&typeof data.nodes!= 'undefined' && data.nodes.length > 0)
    {
      var nodes = data.nodes;
      Session.set(
        "nodes", nodes
      );
      _logClient('node_set: ' + JSON.stringify(nodes));
      _logClient('node_brvs_set: ' + JSON.stringify(data.nodes));
      _logClient('node_parameter_set: ' + JSON.stringify(data.text));
    }
    if(data.brv != null &&typeof data.brv!= 'undefined' && data.brv.length > 0)
    {
      var brvs = data.brv;
      Session.set(
        "node_brvs", brvs
      );
      _logClient('brvs_set: ' + JSON.stringify(brvs));
    }

    // Your logic goes here
    _logClient('tree_itemx: ' + JSON.stringify(data));

    //Remove Codemirror instances to enable refresh
    $('.CodeMirror').each(function(i, el){
      el.remove();;
    });
  }

  this.autorun(function(){
    $('#component_tree').treeview({
      data: getTree(),
      onNodeSelected: selectedEvent
    });
  });
};

Template.nav_column.events({
  'click #logout': function(event, template) {
    Meteor.logout();
  }
});