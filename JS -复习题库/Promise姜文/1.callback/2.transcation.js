function perform(anyMethod, wrappers) {
    return function () {
        wrappers.forEach(wrapper => wrapper.initialize());
        anyMethod();
        wrappers.forEach(wrapper => wrapper.close());
    }
}
let newFn = perform(function () {
    console.log('say')
}, [{ // wrapper1
    initialize() {
        console.log('wrapper1 beforeSay')
    },
    close() {
        console.log('wrapper1 close')
    }
}, { // wrapper2
    initialize() {
        console.log('wrapper2 beforeSay')
    },
    close() {
        console.log('wrapper2 close')
    }
}])
newFn();