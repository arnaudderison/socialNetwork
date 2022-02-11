const userModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors.utlis');


module.exports.uploadProfil = async (req, res) => {
    try {
        if (!req.files)
            return res.status(404).json({ status: false, message: 'No file uploaded' });

        if (
            req.files.file.mimetype != 'image/jpeg' &&
            req.files.file.mimetype != 'image/jpg' &&
            req.files.file.mimetype != 'image/png'
        ) throw Error('Invalid File')

        if (req.files.file.size > 500000) throw Error('Invalid Size')

        let file = req.files.file;
        const fileName = req.body.name + '.jpg';

        file.mv(`${__dirname}/../client/public/upload/profil/${fileName}`);

        res.send('File Upload')

    } catch (err) {
        errors = uploadErrors(err)
        return res.status(400).json( errors )
    }
}