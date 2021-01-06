import crypto from 'crypto';
import path from 'path';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        // Destino das imagens.
        destination: tmpFolder,
        filename: (request, file, callback) => {
            // Geração de nome aleatório para as imagens.
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
