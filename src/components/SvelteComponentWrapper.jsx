import React, { useRef, useEffect } from 'react';
import SvelteComponent from './SvelteComponent.svelte';
import PropTypes from "prop-types";

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

    return <div ref = { svelteContainer } />;
};

SvelteComponentWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SvelteComponentWrapper;