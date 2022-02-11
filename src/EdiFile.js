import React from 'react';
import './EdiFile.css';
import {EdiSegment} from "./EdiSegment";


const indentMods = {
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
            const indentMod = indentMods[segment.tag.value] || 0

            if (indentMod < 0) {
                indent = indent + indentMod;
            }

            content.push(<EdiSegment key={i} data={segment} indent={indent}/>);

            if (indentMod > 0) {
                indent = indent + indentMod;
            }
        }
        return content;
    }
}