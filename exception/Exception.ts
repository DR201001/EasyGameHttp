export class FormatException extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = 'FormatException';
    }
}

export class NumberFormatException extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = 'NumberFormatException';
    }
}

export class StringFormatException extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = 'StringFormatException';
    }
}

export class UrlFormatException extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = 'UrlFormatException';
    }
}

export class OverflowException extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = 'OverflowException';
    }
}