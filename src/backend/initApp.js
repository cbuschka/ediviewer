import {dispatcher} from "@cbuschka/flux";
import {EdiReader} from "../ui/EdiReader";
import {ediFile as exampleEdiFile} from "./exampleData";

export const initApp = async () => {
    const ediFileJson = window.localStorage.getItem("openFiles.0");
    let ediFile;
    if (!!ediFileJson) {
        ediFile = JSON.parse(ediFileJson);
    } else {
        ediFile = exampleEdiFile;
        window.localStorage.setItem("openFiles.0", JSON.stringify(exampleEdiFile));
    }

    try {
        const ediReader = new EdiReader();
        const ediFileData = ediReader.readFromString(ediFile.name, ediFile.text);
        return dispatcher.dispatch({type: "fileLoaded", data: ediFileData})
    } catch (e) {
        console.error(e);
    }
}