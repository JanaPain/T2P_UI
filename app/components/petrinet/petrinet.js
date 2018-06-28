'use strict';

angular.module('myApp').
  component('petrinet', {
    template: '<div id="mynetwork" style="height:100%;width:100%;"></div>',
    bindings: {
   pnml: '<'
      },
    controller: function petrinetController() {
      function generatePetrinet(petrinet){
        var data=getVisElements(petrinet);

        // create a network
        var container = document.getElementById('mynetwork');

        var options = {
          layout: {
          randomSeed: undefined,
          improvedLayout:true,
          hierarchical: {
          enabled:true,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'LR',        // UD, DU, LR, RL
          sortMethod: 'directed'   // hubsize, directed
          }
      },
          groups: {
            places: {color:{background:'#4DB6AC'}, borderWidth:3, shape: 'circle'},
            transitions: {color:{background:'#FFB74D',border: '#FB8C00',}, shape: 'square', borderWidth:3}
      },
      interaction:{
        zoomView:true,
        dragView:true
      }
    }
        // initialize your network!
        var network = new vis.Network(container, data, options);
      }


      this.$onInit = function () {
        generatePetrinet(getPetriNet(this.pnml));

          };

          this.$onChanges = function (changes) {
              generatePetrinet(getPetriNet(changes.pnml.currentValue));
        }


           function getPetriNet( PNML ){
             var places=PNML.getElementsByTagName("place")
             var transitions=PNML.getElementsByTagName("transition")
             var arcs=PNML.getElementsByTagName("arc")
             var petrinet = {
               places:[],
               transitions:[],
               arcs:[]
             }

             for (var x=0;x<arcs.length;x++){
                 var arc = arcs[x];
                 petrinet.arcs.push({id:arc.getAttribute("id"),source:arc.getAttribute("source"),target:arc.getAttribute("target")})
             }

             for (var x=0;x<places.length;x++){
                 var place = places[x];
                 petrinet.places.push({id:place.getAttribute("id"),label:place.getElementsByTagName("text")[0].textContent})
             }

             for (var x=0;x<transitions.length;x++){
                 var transition = transitions[x];
                 petrinet.transitions.push({id:transition.getAttribute("id"),label:transition.getElementsByTagName("text")[0].textContent})
             }

             return petrinet;
           }


           function getVisElements(PetriNet){
             // provide the data in the vis format
             var edges = new vis.DataSet([]);
             var nodes = new vis.DataSet([ ]);
             for (var x=0;x<PetriNet.places.length;x++){
               nodes.add({id: PetriNet.places[x].id,group:"places", label: PetriNet.places[x].label});
             }

             for (var x=0;x<PetriNet.transitions.length;x++){
               nodes.add({id: PetriNet.transitions[x].id,group:"transitions", label: PetriNet.transitions[x].id,title:PetriNet.transitions[x].label});
             }

             for (var x=0;x<PetriNet.arcs.length;x++){
               edges.add({from: PetriNet.arcs[x].source, to: PetriNet.arcs[x].target, arrows:"to"})
             }
             return {nodes:nodes,edges:edges};
           }
         }


  });
