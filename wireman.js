/*
wireman.js - Wire the DOM, or parts of the DOM, to callbacks and monkey around with the MutationEvents
*/

if (typeof wireman === "undefined" || wireman === null) {
  wireman = {};
}
(function(w, d){
    var wires = [];

    function find(selector){
        var item = d.querySelectorAll(selector);
        var array = [];
        for (var i = 0; i < item.length; i++){
            array[i] = item[i];
        }
        return array;
    }

    wireman.wire = function(selector, watchfor, callback){
        var item = d.querySelectorAll(selector);
        for (var i = 0; i < item.length; i++){
            wires[i] = item[i]; //deep copy to scoped namespace
            switch (watchfor){
                case 1: //Implimented proper, event dispatching version of el.setAttribute
                    item[i].addEventListener('DOMAttrModified', callback, true); //get the callback from the global namespace
                    break;
                case 2:
                    item[i].addEventListener('DOMSubtreeModified', callback, true);
                    break;
                case 3:
                    item[i].addEventListener('DOMNodeInserted', callback, true);
                    break;
                case 4:
                    item[i].addEventListener('DOMCharacterDataModified', callback, true);
                    break;
                case 5: //HTML5 Spec, may/may not work in some browsers
                    item[i].addEventListener('DOMContentLoaded', callback, true);
                    break;
            }
        }
    };

    wireman.cut = function(selector, watchfor, callback){
        var item = d.querySelectorAll(selector);
        for (var i = 0; i < item.length; i++){
            wires[i] = item[i]; //deep copy to scoped namespace
            switch (watchfor){
                case 1: //Implimented proper, event dispatching version of el.setAttribute
                    item[i].removeEventListener('DOMAttrModified', callback, true); //get the callback from the global namespace
                    break;
                case 2:
                    item[i].removeEventListener('DOMSubtreeModified', callback, true);
                    break;
                case 3:
                    item[i].removeEventListener('DOMNodeInserted', callback, true);
                    break;
                case 4:
                    item[i].removeEventListener('DOMCharacterDataModified', callback, true);
                    break;
                case 5: //HTML5 Spec, may/may not work in some browsers
                    item[i].removeEventListener('DOMContentLoaded', callback, true);
                    break;
            }
        }
    };

    setData = function(selector, key, value){
        var item = d.querySelectorAll(selector);
        for (var i = 0; i < item.length; i++){
            item[i].setAttribute('data-' + key, value);
        }
    };

    removeData = function(selector, key){
        var item = d.querySelectorAll(selector);
        for (var i = 0; i < item.length; i++){
            item[i].removeAttribute('data-' + key);
        }
    };

    getData = function(selector, key){
        var item = d.querySelectorAll(selector);
        for (var i = 0; i < item.length; i++){
            item[i].getAttribute('data-' + key);
        }
    };

    //"enum" of different DOM change events to watch for
    wireman.watch = {
        attribute: 1,
        modified: 2,
        added: 3,
        charmodified: 4,
        loaded: 5
    };

    //A dirty trick, but it works well
    Element.prototype._setAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, val) {
     var e = document.createEvent("MutationEvents");
     var prev = this.getAttribute(name);
     this._setAttribute(name, val);
     e.initMutationEvent("DOMAttrModified", true, true, null, prev, val, name, 2);
     this.dispatchEvent(e);
    };

}(window, document));
