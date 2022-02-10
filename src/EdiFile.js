import React from 'react';
import './EdiFile.css';
import {EdiSegment} from "./EdiSegment";

export class EdiFile extends React.Component {

    render() {
        const {data: {segments = []}} = this.props;

        return <div>{segments.map((segment, index) => {
            return <EdiSegment key={index} data={segment}/>;
        })}</div>;
    }
}