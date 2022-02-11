import {EdiReader} from "../ui/EdiReader";
import {dispatcher} from "@cbuschka/flux";

export const loadFiles = async (files) => {

    const ediReader = new EdiReader();
    const ediFile = ediReader.readFromString(files[0].name, files[0].data);

    window.localStorage.setItem("openFiles.0", JSON.stringify(ediFile));

    return dispatcher.dispatch({type: "fileLoaded", data: ediFile})
}