import React from 'react';
import './EdiFile.css';
import {EdiSegment} from "./EdiSegment";

export class EdiFile extends React.Component {

    render() {
        const {data: {name, segments = []}} = this.props;

        return <div><h2>{name}</h2>
            {segments.map((segment, index) => {
                return <EdiSegment key={index} data={segment}/>;
            })}</div>;
    }
}