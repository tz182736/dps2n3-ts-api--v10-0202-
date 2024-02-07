import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoPath = path.join(__dirname, '../proto/');

// const protoPath = './dist/proto/';

export enum Metadata_tag {
    Adminkey = "adminkey",
    Apikey = "apikey",
    Username = "username",
    Password = "password"
}

export const protoLoaderConfig = {
    keepCase: true,
    longs: String,
    // enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [protoPath]
    // proto_path: protoPath
};