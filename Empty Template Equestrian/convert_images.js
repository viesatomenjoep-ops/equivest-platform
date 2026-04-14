import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
    './exclusivity in every leap.png',
    './Picture Perfect.png',
    './public/images/logo.png',
    './src/assets/images/luxury_color_palette.png'
];

async function convert() {
    for (const img of images) {
        if (!fs.existsSync(img)) {
             console.log(`Skipping ${img}, not found.`);
             continue;
        }
        try {
            const ext = path.extname(img);
            // Replace spaces with hyphens in the new name to make them URL friendly
            const baseDir = path.dirname(img);
            const baseName = path.basename(img, ext).replace(/\s+/g, '-').toLowerCase();
            const newName = path.join(baseDir, baseName + '.webp');

            await sharp(img)
                .webp({ quality: 80, effort: 6 })
                .toFile(newName);
            console.log(`Converted ${img} to ${newName}`);
        } catch(e) {
            console.error(`Failed ${img}: ${e.message}`);
        }
    }
}

convert();
