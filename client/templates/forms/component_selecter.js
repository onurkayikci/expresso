/*Template.component_selecter.helpers({
  options: function(){
        var options = new Array();

        var cursor = Components.find({}, { sort: { time: 1 }});
        if (!cursor.count()) return null;

        var components = cursor.fetch();
        var selected_components = Meteor.user().profile.components;

        //console.log('selected components: ' + selected_components);

        var selected = function(x){
          if( selected_components == null || typeof selected_components == 'undefined' || selected_components.length == 0)
            return null;
          else if(_.contains(selected_components, x._id))
            return 'selected';
          else
            return null;
        }

        if( components != null && typeof components != 'undefined' && components.length > 0){
          components.forEach(function (row) {
          //  console.log('components:' + row._id);
          <optgroup label="Condiments" data-max-options="2">

            var option = {
              _id :row._id,
              name : row._id,
              selected : selected(row)
            };
            options.push(option);
            console.log('option:' + JSON.stringify(option));
          });
        }
        console.log('options:' + JSON.stringify(options));
        return options;
        }
})  */

Template.component_selecter.helpers({
  options: function(){
       /* var option = [{
          optGroupLabel: 'BDC2015',
          component_option_items :[
            {
              _id :'AIRConditioning',
              name : 'AIRConditioning',
              selected : null
            }
          ]
        },
        {
          optGroupLabel: 'BDC2015',
          component_option_items :[
            {
              _id :'AIRConditioning',
              name : 'AIRConditioning',
              selected : null
            }
          ]
           ];
        } */

        var options = new Array();
        var cursor = Components.find({}, { sort: { time: 1 }});
        if (!cursor.count()) return null;

        var components = cursor.fetch();
        var selected_components = Meteor.user().profile.components;

        _logClient('selected components: ' + selected_components);

        var getSelectedBlocks = function(blockId){
          if( selected_components == null || typeof selected_components == 'undefined' || selected_components.length == 0)
            return null;

          var selected = _.contains(selected_components, blockId);

          if(selected){
            _logClient(blockId + ' was selected: ' + selected);
            return 'selected';
          }
          else
            return null;
        }

        var getComponentBlocks = function(row){
          var cafBlock = new Array();
          row.caf_blocks.forEach(function(block){
            var blockId = (row._id + "_" + block._id);
            var newblock = {
              _id :blockId,
              name : block._id,
              selected : getSelectedBlocks(blockId)
            };
            cafBlock.push(newblock);
          });

          return cafBlock;
        }

        if( components != null && typeof components != 'undefined' && components.length > 0){
          components.forEach(function (row) {
          _logClient('components:' + row._id);

            var option = {
              optGroupLabel: row._id,
              component_option_items: getComponentBlocks(row)
            };
            options.push(option);
            _logClient('option:' + JSON.stringify(option));
          });
        }
        _logClient('options:' + JSON.stringify(options));
        return options;
        }
})
