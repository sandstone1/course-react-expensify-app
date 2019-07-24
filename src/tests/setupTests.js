
// import the default export for the enzyme library
import Enzyme from 'enzyme';
// import the default export for adapter and then we'll specify the module name
import Adapter from 'enzyme-adapter-react-16';

// now we will use a single method call to configure everything and Enzyme.configure()
// can take in all sorts of attributes and we will pass in as the first and only argument
// an object and on this object we can specify various configuration properties and were
// going to set the adapter property equal to a new instance of the adapter we would like
// to use and this is all we need for this file and now whenever we use enzyme in our test
// cases which we will be doing in just a little bit we will have support for react version
// 16
Enzyme.configure({
    adapter : new Adapter()
});
