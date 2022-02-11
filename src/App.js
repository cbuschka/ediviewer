import React from 'react';
import './App.css';
import {EdiFile} from "./EdiFile";
import {Dropzone} from "./Dropzone";
import {EdiReader} from "./EdiReader";

export class App extends React.Component {

    state = {ediFileData: {segments: []}};

    onChange = async ({data: fileStrings}) => {
        console.log("got %o", fileStrings);

        let ediReader = new EdiReader();
        const ediFileData = ediReader.readFromString(fileStrings[0]);

        this.setState({ediFileData});
    }

    render() {
        const {ediFileData} = this.state;

        return (
            <div className="App">
                <Dropzone onChange={this.onChange}/>

                <EdiFile data={ediFileData}/>
            </div>
        );
    }
}

export default App;
