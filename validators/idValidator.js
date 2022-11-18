import { Types } from "mongoose";

export default class IdValidator {
    static isValid (id) {
        return Types.ObjectId.isValid(id);
    }
}