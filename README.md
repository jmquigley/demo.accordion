# demo.accordion

> A sample react project that shows how to do a simple accordion control

This is a sample [ReactJS](https://facebook.github.io/react/) accordion sample that uses [Typescript](https://www.typescriptlang.org/).  It was inspired by the tutorial
@ https://egghead.io/lessons/react-building-an-accordion-component-with-react

This will create an `h1` and a `p`aragraph.  When the h1 is clicked, the paragraph is hidden.  When it is clicked again it is shown (toggled).

The point of this sample is to show how to properly create a ReactJS class using Typescript.  It also shows how *properties* and *state* can be used within a React class control.  Last of all it demonstrates the binding of an event listener function ([this](http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/) and [this](http://stackoverflow.com/questions/32317154/uncaught-typeerror-cannot-read-property-setstate-of-undefined) explain why this is needed; this is an ugly javascript gotcha).

The demo also shows how to use redux to manage the state of the application.


## Usage

To build the sample use:

```
npm run all
```

This will install all of the node packages and then use webpack to build the bundle.  Once built start the node express server to show the code with:

```
npm start
```

The server will be on http://localhost:3000

One can also setup a webpack watcher to play with the code.  Use:

```
npm start watch
```

And the webpack will watch for code changes to the app and automatically rebuild the bundle (with typescript) for testing.