import React from 'react';
import './Dropzone.css';
import ReactDropzone from 'react-dropzone'

export class Dropzone extends React.Component {

    onFilesAccepted = async (acceptedFiles) => {

        const {
            onChange = () => {
            }
        } = this.props;

        const fileStrings = await Promise.all(acceptedFiles.map((file) => {

            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onabort = () => reject('file reading was aborted');
                reader.onerror = () => reject('file reading has failed')
                reader.onload = () => {
                    const binaryStr = reader.result

                    resolve({name: file.name, data: binaryStr});
                }
                reader.readAsBinaryString(file);
            });
        }));
        onChange({data: fileStrings});
    }

    render() {
        return <ReactDropzone onDrop={this.onFilesAccepted}>
            {({getRootProps, getInputProps}) => (
                <div className="Dropzone">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files.</p>
                        <p>(Data won't be sent to a server. All processing will take place in your browser locally.)</p>
                    </div>
                </div>
            )}
        </ReactDropzone>;
    }
}