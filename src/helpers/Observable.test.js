let Observable = require("./Observable.js");


describe("observables", () => {
    it("creates a new observalbe", () => {
        let obs = new Observable();
    });

    it("can subscribe to observable and get one value", () => {
        let obs = new Observable((observer)=> {
            observer.next("apple");
        });
        obs.subscribe((val) => {
            expect(val).toBe("apple");
        });
    });

    it("can subscribe to observable and get several value", () => {
        let obs = new Observable((observer)=> {
            observer.next("apple");
            observer.next("pear");
            observer.next("banana");
        });
        let values = [];
        obs.subscribe((val) => {
            values.push(val);
        });
        expect(values.length).toBe(3);
        expect(values[0]).toBe("apple");
        expect(values[1]).toBe("pear");
        expect(values[2]).toBe("banana");
    });

    it("can do something asynchronous", (done) => {
        let obs = new Observable((observer)=> {
            setTimeout(()=> {
                observer.next("apple");
            },0);
        });
        let values = [];
        obs.subscribe((val) => {
            expect(val).toBe("apple");
            done();
        });
    });
});