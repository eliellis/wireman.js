## What problem does this solve?
The purpose of __wireman.js__, aside from curiosity, was to create a tool that sped-up hooking events to large amounts of DOM elements with few lines of code. This module does just that, it allows for listening to attribute changes, html changes (both adding and modification), and a handful other DOMTree events.

## Okay, sounds pretty cool, how do I use it?
It's super simple!

```javascript
wireman.wire('body', wireman.watch.attribute, callBack);

function callBack(e){
    console.log(e);
}
```

### What is this code doing?
Plain and simple, we're wiring up the body to the call the `callBack` method when _any_ attribute changes in the document. Just like I told you, simple right? But we don't have to just use `'body'` to pick elements, we can use any CSS selector!

```javascript
wireman.wire('div.complicatedclass#reallycomplicated', wireman.watch.attribute, callBack);

function callBack(e){
    console.log(e);
}
```
Awesome!

### Help me, I'm drowning in events!
Too many calls to your callback methods? Sorry man, I'll help you out.

```javascript
wireman.cut('body', wireman.watch.attribute, callBack);
```

Just as simple as wiring the stuff up!

### What kind of things can I watch for?
```javascript
/*
    taken from wireman.js
*/
wireman.watch = {
    attribute: 1, //watch the attributes of an element
    modified: 2, //watch an element for modifications
    added: 3, //watch an element for added Node objects
    charmodified: 4, //watch a TextNode object for modification
    loaded: 5 //watch an element for the DOMContentLoaded event, bleeding edge so it may not work well
};
```
