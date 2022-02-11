import React from 'react';
import './App.css';
import {EdiFile} from "./ui/EdiFile";
import {Dropzone} from "./ui/Dropzone";
import {dispatcher} from "@cbuschka/flux";
import {appStore} from "./backend/appStore";
import {loadFiles} from './backend/loadFiles';
import {initApp} from "./backend/initApp";

export class App extends React.Component {

    state = {ediFile: {segments: []}};

    onFilesDropped = async ({data: files}) => {
        loadFiles(files);
    }

    onChange = ({data}) => {
        const {app: {ediFile}} = data;
        this.setState({ediFile});
    }

    componentDidMount() {
        dispatcher.addHandler(appStore);
        dispatcher.subscribe(this.onChange);

        initApp();
    }

    componentWillUnmount() {
        dispatcher.unsubscribe(this.onChange);
        dispatcher.removeHandler(appStore);
    }

    render() {
        const {ediFile} = this.state;

        return (
            <div className="App">
                <a href="https://cbuschka.github.io/ediviewer/" rel="noopener noreferrer"><h1>EDIViewer</h1></a>
                <h4>(UN/EDIFACT only, no UNA support, no repetitions.)</h4>

                <Dropzone onChange={this.onFilesDropped}/>

                {!!ediFile ? <div className="App__EdiFile">
                    <EdiFile data={ediFile}/>
                </div> : ""}

                <div className="App__Footer">
                    <a href="https://github.com/cbuschka/ediviewer/" target="_blank" rel="noopener noreferrer">github
                        project</a> | Version: {process.env.REACT_APP_GIT_COMMITISH} | Built
                    at: {process.env.REACT_APP_BUILD_TIMESTAMP}
                </div>
            </div>
        );
    }
}

export default App;
