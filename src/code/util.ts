import * as parser from './../output/parser';
import { LogHelper } from './log_helper';
import { ERROR_TYPE } from './enums';

export class Util {
    static isString(value) {
        return typeof value === 'string';
    }

    static parseJson(value) {
        const reviver = (key, val) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
            if (typeof val === "string" && dateFormat.test(val)) {
                return new Date(val);
            }

            return val;
        };
        return JSON.parse(value, reviver);
    }

    static parseSql(query: string) {
        try {
            query = query.replace(new RegExp('\n', 'g'), '').trim();
            return parser.parse(query);
        }
        catch (ex) {
            const err = new LogHelper(ERROR_TYPE.SynTaxError, ex.message).get();
            throw err;
        }
    }
}