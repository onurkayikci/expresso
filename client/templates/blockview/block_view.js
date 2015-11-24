
Template.block_view.helpers({
  parameter_title: function(){
    _logClient('node_title_get: ' + JSON.stringify(Session.get("node_title")));
    return Session.get("node_title");
  },
  brvs: function (){
    _logClient('node_brvs_get: ' + JSON.stringify(Session.get("node_brvs")));
    return Session.get("node_brvs");
  },
  parameterBRVs: function (){
    _logClient('nodes_get: ' + JSON.stringify(Session.get("nodes")));
    var parBRVs = new Array();
    var variants = Session.get("nodes");
    var variant = _.first(variants);

    variant.brv.forEach(function(brv){
      var brvObject = {
        brvName : brv.name,
        variants : new Array()
      };
      parBRVs.push(brvObject);
    });

    parBRVs.forEach(function(parBRV){
      variants.forEach(function(varObj){
        varObj.brv.forEach(function(brv){
          if(parBRV.brvName === brv.name)
          {
            var parBRVObj = {
              variantName : varObj.text,
              code : brv.code
            };
            parBRV.variants.push(parBRVObj);
          }
        });
      });
    });

    return parBRVs;
  },
  codeValue : function (){
    _logClient('code_value_get: ' + JSON.stringify(Session.get("code_value")));
    return Session.get("code_value");
  },
  functionProperties : function(){
    _logClient('function_properties: ' + JSON.stringify(Session.get("function_properties")));
    return Session.get("function_properties");
  },
  functionNode : function (){
    if("variant" == Session.get("node_type"))
      return true;
    else
      return false;
  },
  blockNode : function (){
    if("block" == Session.get("node_type"))
      return true;
    else
      return false;
  },
  parameterNode: function (){
    if("function" == Session.get("node_type"))
      return true;
    else
      return false;
  },
  aktivierungsBedingungen: function (){
    if("block" == Session.get("node_type")){
      return Session.get("aktivierungs_bedingungen");
    }
    else
      return null;
  }



  /*ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },/*,
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }*/
  /*  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  }*/
});


Template.block_view.rendered = function(){
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    //Remove Codemirror instances to enable refresh
    $('.CodeMirror').each(function(i, el){
      el.remove();;
    });
    Session.set("viewTab", target);
  });

}

Template.code_well.rendered = function() {

  var codeWell = this;

  codeWell.autorun(function(){
    var nodeTitle = Session.get("node_title");
    var viewTab = Session.get("viewTab");
    var codeEditor = CodeMirror.fromTextArea(codeWell.find("#myCodeArea"), {
      lineNumbers: true,
      mode: "javascript",
      lineWrapping: true,
      theme: "default",
      readOnly: false
      //matchBrackets: true// set any of supported language modes here
    });
  });
  //$('#accordion').collapse("hide");
}

Template.getCAFForm.events({
  'submit form': function(e) {
    e.preventDefault();

    var cafquery = {

    }
    var i_stufe = $(e.target).find('[name=i_stufe]').val();
    var release = $(e.target).find('[name=release]').val();
    var search = $(e.target).find('[name=search]').val();

    if(i_stufe.length>0)
      Session.set("searched_i_stufe", i_stufe);
    if(release.length>0)
      Session.set("searched_release", release);

  }
});


