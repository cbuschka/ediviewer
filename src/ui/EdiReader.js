export class EdiReader {

    escape_char = '?';
    segment_separator = '\'';
    component_separator = ':';
    element_separator = '+';

    readFromString(name, data) {
        const segments = this.readSegments(data);
        return {name, segments};
    }

    getDataPart = (data, limit, start = 0) => {
        const len = data.length;
        let skip = false;
        let line = '';
        let i = 0;
        for(i = start; i < len; i++ ){
            let char = data.charAt(i);
            // skip only escape_char + limit_char or escape_char + escape_char.  Not escape_char alone
            if (!skip && char === this.escape_char && i < len-1) {
                if (data.charAt(i+1) === limit || data.charAt(i+1) === this.escape_char)
                {
                    skip = true;
                    continue;
                }
            }
            if (!skip && char === limit) {
                break;
            }
            line += char;
            skip = false;
        }
        return {
            line: line,
            start: start,
            stop: i,
        };
    }

    splitData = (data, limit) => {
        const len = data.length;
        const lines = [];
        let start = 0;
        while(start < len) {
            let line_info = this.getDataPart(data, limit, start);
            lines.push(line_info.line);
            start = line_info.stop + 1;
        }
        return lines;
    }

    readSegments = (data) => {
        if(data.startsWith('UNA'))
        {
            this.component_separator = data.charAt(3);
            this.element_separator = data.charAt(4);
            // this.decimal_notation = data.charAt(5);
            this.escape_char = data.charAt(6);
            // this.repetition_char = data.charAt(7);
            this.segment_separator = data.charAt(8);
        }
        const segments = [];
        const lines = this.splitData(data, this.segment_separator);
        for (let i = 0; i < lines.length; ++i) {
            const line = lines[i];
            if (line.trim() === "") {
                continue;
            }
            const segment = this.readSegment(line);
            segments.push(segment);
        }

        return segments;
    }

    readSegment = (line) => {
        if (line.startsWith("UNA")) {
            return this.readUNASegment(line);
        }

        const segment = {tag: undefined, dataElements: []};
        const words = this.splitData(line, this.element_separator);
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
        segment.dataElements.push({value: this.segment_separator});
        return segment;
    }

    readTag = (word) => {
        const wordParts = this.splitData(word, this.component_separator);
        const tagName = wordParts[0].trim();
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
        const wordParts = this.splitData(word, this.component_separator);
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
