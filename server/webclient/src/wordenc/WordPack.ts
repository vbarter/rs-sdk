import Packet from '#/io/Packet.js';

export default class WordPack {
    // prettier-ignore
    private static TABLE: string[] = [
        ' ',
        'e', 't', 'a', 'o', 'i', 'h', 'n', 's', 'r', 'd', 'l', 'u', 'm',
        'w', 'c', 'y', 'f', 'g', 'p', 'b', 'v', 'k', 'x', 'j', 'q', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        ' ', '!', '?', '.', ',', ':', ';', '(', ')', '-',
        '&', '*', '\\', '\'', '@', '#', '+', '=', '£', '$', '%', '"', '[', ']'
    ];

    private static charBuffer: string[] = [];

    static unpack(word: Packet, length: number): string {
        // UTF-8 模式：首字节 0xFF 标记
        if (length > 0 && word.data[word.pos] === 0xFF) {
            word.pos++; // 跳过标记
            const data = word.data.slice(word.pos, word.pos + length - 1);
            word.pos += length - 1;
            return new TextDecoder().decode(data);
        }

        let pos: number = 0;
        let carry: number = -1;
        let nibble: number;
        for (let index: number = 0; index < length && pos < 100; index++) {
            const value: number = word.g1();
            nibble = (value >> 4) & 0xf;
            if (carry !== -1) {
                this.charBuffer[pos++] = this.TABLE[(carry << 4) + nibble - 195];
                carry = -1;
            } else if (nibble < 13) {
                this.charBuffer[pos++] = this.TABLE[nibble];
            } else {
                carry = nibble;
            }
            nibble = value & 0xf;
            if (carry !== -1) {
                this.charBuffer[pos++] = this.TABLE[(carry << 4) + nibble - 195];
                carry = -1;
            } else if (nibble < 13) {
                this.charBuffer[pos++] = this.TABLE[nibble];
            } else {
                carry = nibble;
            }
        }
        let uppercase: boolean = true;
        for (let index: number = 0; index < pos; index++) {
            const char: string = this.charBuffer[index];
            if (uppercase && char >= 'a' && char <= 'z') {
                this.charBuffer[index] = char.toUpperCase();
                uppercase = false;
            }
            if (char === '.' || char === '!') {
                uppercase = true;
            }
        }
        return this.charBuffer.slice(0, pos).join('');
    }

    static pack(word: Packet, str: string): void {
        if (str.length > 80) {
            str = str.substring(0, 80);
        }

        // 检测是否包含非 ASCII 字符，使用 UTF-8 模式
        const hasUnicode = /[^\x00-\x7f]/.test(str);
        if (hasUnicode) {
            word.p1(0xFF); // UTF-8 标记
            const encoded = new TextEncoder().encode(str);
            for (let i = 0; i < encoded.length; i++) {
                word.p1(encoded[i]);
            }
            return;
        }

        str = str.toLowerCase();
        let carry: number = -1;
        for (let index: number = 0; index < str.length; index++) {
            const char: string = str.charAt(index);
            let currentChar: number = 0;
            for (let lookupIndex: number = 0; lookupIndex < this.TABLE.length; lookupIndex++) {
                if (char === this.TABLE[lookupIndex]) {
                    currentChar = lookupIndex;
                    break;
                }
            }
            if (currentChar > 12) {
                currentChar += 195;
            }
            if (carry === -1) {
                if (currentChar < 13) {
                    carry = currentChar;
                } else {
                    word.p1(currentChar);
                }
            } else if (currentChar < 13) {
                word.p1((carry << 4) + currentChar);
                carry = -1;
            } else {
                word.p1((carry << 4) + (currentChar >> 4));
                carry = currentChar & 0xf;
            }
        }
        if (carry !== -1) {
            word.p1(carry << 4);
        }
    }
}
