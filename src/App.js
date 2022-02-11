import React from 'react';
import './App.css';
import {EdiFile} from "./EdiFile";
import {Dropzone} from "./Dropzone";
import {EdiReader} from "./EdiReader";


export class App extends React.Component {

    state = {ediFileData: {segments: []}};

    onChange = async ({data: files}) => {
        const ediReader = new EdiReader();
        const ediFileData = ediReader.readFromString(files[0].name, files[0].data);

        this.setState({ediFileData});
    }

    render() {
        const {ediFileData} = this.state;

        return (
            <div className="App">
                <h1>EDIViewer </h1>
                <h4>(UN/EDIFACT only, no UNA support, no repetitions.)</h4>

                <Dropzone onChange={this.onChange}/>

                <div className="App__EdiFile">
                    <EdiFile data={ediFileData}/>
                </div>

                <div className="App__Version">Version: {process.env.REACT_APP_GIT_COMMITISH}, Built
                    at: {process.env.REACT_APP_BUILD_TIMESTAMP}
                </div>
            </div>
        );
    }
}

export default App;
