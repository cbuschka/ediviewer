import React from 'react';
import './EdiSegment.css';
import {EdiDataElement} from "./EdiDataElement";

export class EdiSegment extends React.Component {

    render() {
        const {data: {tag = "", dataElements = []}, indent = 0} = this.props;

        return <div className={"EdiSegment EdiSegment__" + tag.value.trim() + " EdiSegment__Indent" + indent}>
            <span className="EdiSegment__Tag">{tag.value.trim()}</span>
            {dataElements.map((dataElement, index) => {
                return <EdiDataElement key={index} data={dataElement}/>;
            })}
        < /div>;
    }
}