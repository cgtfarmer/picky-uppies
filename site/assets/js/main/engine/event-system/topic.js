export default class Topic {
    // private subscriptions: (Subscription | null)[];
    constructor() {
        this.subscriptions = [];
    }
    subscribe(subscription) {
        this.subscriptions.push(subscription);
    }
    unsubscribe(id) {
        // const matchIndices: (number | null)[] = this.subscriptions
        //   .map((e, i) => (e.getId() == id) ? i : null )
        //   .filter((e) => (e != null));
        // this.subscriptions
        //   .map((e, i) => (e.getId() == id) ? i : undefined)
        //   .filter((e) => (e != undefined))
        //   .forEach((e) => this.subscriptions.slice(e, 1));
        // this.subscriptions
        //   .forEach((e, i) => {
        //     (e.getId() == id) ? this.subscriptions.slice(i, 1) : return
        //   });
        // const blah: (Subscription | null)[] = this.subscriptions
        //   .map((e) => (e.getId() == id) ? null : e);
        // const blah2: Subscription[] = blah
        //   .filter((e) => (e != null));
        // this.subscriptions = this.subscriptions.reduce((a, e) => a.push(e), []);
        // Weird type-safe exclusion of nulls
        this.subscriptions = this.subscriptions
            .map((e) => (e.getId() == id) ? null : e)
            .filter((e) => (e != null));
    }
    publish(msg) {
        this.subscriptions.forEach((e) => e.getCallback()(msg));
    }
}
