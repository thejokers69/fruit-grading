import React from 'react';

const SampleTable = () => {
    const data = [
        { id: '001', quality: 'A', weight: 20 },
        { id: '002', quality: 'B', weight: 25 }
    ];

    return ( <
        table >
        <
        thead >
        <
        tr >
        <
        th > Sample ID < /th> <
        th > Quality < /th> <
        th > Weight < /th> <
        /tr> <
        /thead> <
        tbody > {
            data.map((sample, index) => ( <
                tr key = { index } >
                <
                td > { sample.id } < /td> <
                td > { sample.quality } < /td> <
                td > { sample.weight } < /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table>
    );
};

export default SampleTable;