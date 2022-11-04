import bcrypt from 'bcrypt';

export default class HashService {
    static hash = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    static compare = async (enteredPassword, storedPassword) => {
        return await bcrypt.compare(enteredPassword, storedPassword);
    }
}