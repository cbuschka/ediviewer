import React from 'react';
import './EdiFile.css';
import {EdiSegment} from "./EdiSegment";


const indentMod = {
    "UNH": 1,
    "UNT": -1,
};


export class EdiFile extends React.Component {

    render() {
        const {data: {name, segments = []}} = this.props;

        return <div>
            <h2>{name}</h2>
            {this.renderSegments(segments)}
        </div>;
    }

    renderSegments = (segments) => {
        let indent = 0;
        const content = [];
        for (let i = 0; i < segments.length; ++i) {
            const segment = segments[i];
            content.push(<EdiSegment key={i} data={segment} indent={indent}/>);
            indent = indent + (indentMod[segment.tag.value] || 0);
        }
        return content;
    }
}