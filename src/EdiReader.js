export class EdiReader {

    readFromString(name, data) {
        const segments = this.readSegments(data);
        return {name, segments};
    }

    readSegments = (data) => {
        const segments = [];
        const lines = data.split("'");
        for (let i = 0; i < lines.length; ++i) {
            const line = lines[i];
            if (line !== "") {
                const segment = this.readSegment(line);
                segments.push(segment);
            }
        }

        return segments;
    }

    readSegment = (line) => {
        if (line.startsWith("UNA")) {
            return this.readUNASegment(line);
        }

        const segment = {tag: undefined, dataElements: []};
        const words = line.split('+');
        segment.tag = this.readTag(words[0]);
        words.splice(0, 1);
        segment.dataElements = this.readDataElements(words);
        return segment;
    }

    readUNASegment = (line) => {
        const segment = {tag: {value: "UNA"}, dataElements: []};
        for (let i = 3; i < line.length; ++i) {
            segment.dataElements.push({value: line.charAt(i)});
        }
        return segment;
    }

    readTag = (word) => {
        const wordParts = word.split(':');
        const tagName = wordParts[0];
        wordParts.splice(0, 1);
        const values = wordParts.map((wordPart) => {
            return {
                value: wordPart
            };
        });
        return {value: tagName, values: values};
    }

    readDataElements = (words) => {
        return words.map((word) => this.readDataElement(word));
    }

    readDataElement = (word) => {
        const wordParts = word.split(':');
        if (wordParts.length === 1) {
            return {value: wordParts[0]};
        } else {
            return {
                values: wordParts.map((wordPart) => {
                    return {value: wordPart};
                })
            };
        }
    }
}