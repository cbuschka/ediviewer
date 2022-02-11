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
                <h1>EDIViewer</h1>

                <Dropzone onChange={this.onChange}/>

                <div className="App__EdiFile">
                    <EdiFile data={ediFileData}/>
                </div>
            </div>
        );
    }
}

export default App;
