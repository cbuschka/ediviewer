import {dispatcher} from "@cbuschka/flux";

export const initApp = async () => {
    const ediFileJson = window.localStorage.getItem("openFiles.0");
    const ediFile = JSON.parse(ediFileJson);

    return dispatcher.dispatch({type: "fileLoaded", data: ediFile})
}