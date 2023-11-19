export default class DomAccessor {
    static getInstance() {
        if (this.singleton == null)
            this.singleton = new DomAccessor();
        return this.singleton;
    }
    get(elementId) {
        return document.querySelector(`#${elementId}`);
    }
    append(elementId, element) {
        const containerElement = this.get(elementId);
        if (containerElement == null)
            return;
        containerElement.insertAdjacentElement('beforeend', element);
    }
}
