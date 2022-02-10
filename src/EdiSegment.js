import React from 'react';
import './EdiSegment.css';
import {EdiDataElement} from "./EdiDataElement";

export class EdiSegment extends React.Component {

    render() {
        const {data: {tag = "", dataElements = []}} = this.props;

        return <div className="EdiSegment">
            <span className="EdiSegment__Tag">{tag.value}</span>
            {dataElements.map((dataElement, index) => {
                return <EdiDataElement key={index} data={dataElement}/>;
            })}
        < /div>;
    }
}