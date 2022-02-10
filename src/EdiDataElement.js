import React from 'react';
import './EdiDataElement.css';

const isObject = (x) => typeof x === "object";
const isString = (x) => typeof x === "string";
const isArray = (x) => isObject(x) && !isString(x) && x.hasOwnProperty("length");

export class EdiDataElement extends React.Component {

    render() {
        const {data = ""} = this.props;

        if (isObject(data) && isString(data.value)) {
            return <span className="EdiDataElement">{data.value}</span>;
        } else if (isObject(data) && isArray(data.values)) {
            return <span className="EdiDataElement EdiDataElement__Composite">{
                data.values.map((dataElement, index) => {
                    return <EdiDataElement data={dataElement} key={index}/>;
                })
            }</span>;

        } else {
            return <span className="EdiDataElement">???</span>;
        }
    }
}