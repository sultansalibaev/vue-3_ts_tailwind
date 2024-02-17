export default {
    name: 'focus',
    mounted(el: HTMLInputElement | Element) {
        if (el instanceof HTMLInputElement) {
            el.focus();
            return;
        }
        const innerInput = el.querySelector('input');
        if (innerInput) {
            innerInput.focus();
        }
    },
}