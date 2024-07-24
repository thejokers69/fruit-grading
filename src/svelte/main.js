import Sample from './Sample.svelte';

const app = new Sample({
    target: document.body,
    props: {
        name: 'world'
    }
});

export default app;