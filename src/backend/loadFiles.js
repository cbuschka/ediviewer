import {EdiReader} from "../ui/EdiReader";
import {dispatcher} from "@cbuschka/flux";

export const loadFiles = async (files) => {

    const ediReader = new EdiReader();
    const ediFile = ediReader.readFromString(files[0].name, files[0].data);

    window.localStorage.setItem("openFiles.0", JSON.stringify({name: files[0].name, text: files[0].data}));

    return dispatcher.dispatch({type: "fileLoaded", data: ediFile})
}