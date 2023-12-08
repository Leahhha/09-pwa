/*

These customizations allow us to configure multer to do a few things:
1. Set the destination where our uploads will end up (same as before)
2. Filter the uploaded files based on file type
    This is a security check so our server doesn't end up with malicious files
3. Customize the filename based on the original file

*/

// using multer to save our uploaded files to disk
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    // setting where we save our files
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    // require multer for file storage with filters for file types
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ]
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only image files are allowed.'));
        }
    },
    // we have to do some jujitsu to get the original filenames
    filename: (req, file, cb) => {
        // Use the original file basename and extension, e.g. 'sofa' and '.jpeg'
        const ext = path.extname(file.originalname)
        const basename = path.basename(file.originalname, ext)
        // add the date to allow for duplicates/re-posts
        cb(null, `${basename}-${Date.now()}${ext}`)
    }
})

const saveFile = multer({ storage })

module.exports = saveFile