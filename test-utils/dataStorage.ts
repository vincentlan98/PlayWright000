import fs from 'fs';
import path from 'path';

const storagePath = path.join(__dirname, 'test-storage.json');

export const dataStorage = {
    setValue<T = string>(key: string, value: T) {
        let data: Record<string, any> = {};

        if (fs.existsSync(storagePath)) {
            try {
                const fileContent = fs.readFileSync(storagePath, 'utf-8');
                data = JSON.parse(fileContent);
            } catch (error) {
                console.warn('Failed to parse storage file:', error);
                data = {};
            }
        }

        data[key] = value;
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
    },

    getValue<T = string>(key: string): T | null {
        if (!fs.existsSync(storagePath)) return null;

        try {
            const fileContent = fs.readFileSync(storagePath, 'utf-8');
            const data: Record<string, any> = JSON.parse(fileContent);
            return data[key] || null;
        } catch (error) {
            console.warn('Failed to read storage file:', error);
            return null;
        }
    },

    clearStorage() {
        if (fs.existsSync(storagePath)) {
            fs.unlinkSync(storagePath);
        }
    }
};