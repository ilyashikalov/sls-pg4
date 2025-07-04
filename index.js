const sharp = require('sharp');

async function cropImage(imageBase64, width, height) {
    try {
        // decode the image from base64
        const buffer = Buffer.from(imageBase64, 'base64');
        // crop the image
        const croppedBuffer = await sharp(buffer)
            .resize(width, height) 
            .toBuffer(); 
        // incode the cropped image to base64
        const croppedImageBase64 = croppedBuffer.toString('base64');
        return croppedImageBase64;
    } catch (error) {
        // something went wrong
        console.error('Error cropping image:', error);
        throw error;
    }
}
// entrypoint function
module.exports.handler = async function (event, context) {
    return {
        content: await cropImage(event.content, event.width, event.height)
    };
};

