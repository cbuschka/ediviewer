import './App.css';
import {EdiFile} from "./EdiFile";
import {ediFileData} from './data';

function App() {
    return (
        <div className="App">
            <EdiFile data={ediFileData}/>
        </div>
    );
}

export default App;
