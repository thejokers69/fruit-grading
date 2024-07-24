import React, { useRef, useEffect } from 'react';
import SvelteComponent from './SvelteComponent.svelte';

const SvelteComponentWrapper = ({ name }) => {
    const svelteContainer = useRef(null);

    useEffect(() => {
        const svelteInstance = new SvelteComponent({
            target: svelteContainer.current,
            props: { name },
        });

        return () => {
            svelteInstance.$destroy();
        };
    }, [name]);

    return <div ref = { svelteContainer } > < /div>;
};

export default SvelteComponentWrapper;