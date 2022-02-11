import React from 'react';
import './EdiSegment.css';
import {EdiDataElement} from "./EdiDataElement";

export class EdiSegment extends React.Component {

    render() {
        const {data: {tag = "", dataElements = []}} = this.props;

        return <div className={"EdiSegment EdiSegment__" + tag.value.trim()}>
            <span className="EdiSegment__Tag">{tag.value.trim()}</span>
            {dataElements.map((dataElement, index) => {
                return <EdiDataElement key={index} data={dataElement}/>;
            })}
        < /div>;
    }
}