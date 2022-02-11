import {dispatcher} from "@cbuschka/flux";
import {EdiReader} from "../ui/EdiReader";

export const initApp = async () => {
    const ediFileJson = window.localStorage.getItem("openFiles.0");
    const ediFile = JSON.parse(ediFileJson);

    try {
        const ediReader = new EdiReader();
        const ediFileData = ediReader.readFromString(ediFile.name, ediFile.text);
        return dispatcher.dispatch({type: "fileLoaded", data: ediFileData})
    } catch (e) {
        console.error(e);
    }
}