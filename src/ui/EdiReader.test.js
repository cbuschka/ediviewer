import {EdiReader} from "./EdiReader";

describe('parsing without una', () => {
const ediDataWithoutUna = "UNH+ME000001+INVRPT:D:01B:UN:EAN007'"
    + "BGM+35+IVR21599+9'"
    + "DTM+137:20020301:102'"
    + "DTM+366:20020228:102'"
    + "NAD+GY+5412345000013::9'"
    + "RFF+VA:685311'"
    + "NAD+CO+5410738100005::9'"
    + "RFF+VA:544211'"
    + "LIN+1++5412345100102:SRV'"
    + "INV++++1QTY+145:55'"
    + "DTM+361:20020425:102'"
    + "PRI+AAB:890:CA:RTP'"
    + "INV++++1QTY+145:185'"
    + "DTM+361:20020429:102'"
    + "PRI+AAB:890:CA:RTP'"
    + "LIN+2++5412345100560:SRV'"
    + "INV++++1QTY+145:12'"
    + "DTM+361:20020414:102'"
    + "PRI+AAB:1450:CA:RTP'"
    + "INV++++1QTY+145:100'"
    + "DTM+361:20020419:102'"
    + "PRI+AAB:1450:CA:RTP'"
    + "LIN+3++5412345100782:SRV'"
    + "INV++++1QTY+145:325'"
    + "PRI+AAB:540:CA:RTP'"
    + "UNT+31+ME000001'";

    test('parses non una inv', () => {
        const ediReader = new EdiReader();
        const ediFile = ediReader.readFromString("name", ediDataWithoutUna);

        expect(ediFile.segments[0].tag.value).toBe("UNH");
        expect(ediFile.segments[1].tag.value).toBe("BGM");
        expect(ediFile.segments[25].tag.value).toBe("UNT");
        expect(ediFile.segments.length).toBe(26);
    });

    test('parses una inv', () => {
        const ediDataWithUna = "UNA;|.? !"
            + ediDataWithoutUna.replace(/:/g, ";").replace(/\+/g, "|").replace(/'/g, "!");

        const ediReader = new EdiReader();
        const ediFile = ediReader.readFromString("name", ediDataWithUna);

        expect(ediFile.segments[0].tag.value).toBe("UNA");
        expect(ediFile.segments[1].tag.value).toBe("UNH");
        expect(ediFile.segments[2].tag.value).toBe("BGM");
        expect(ediFile.segments[26].tag.value).toBe("UNT");
        expect(ediFile.segments.length).toBe(27);
    });

});
