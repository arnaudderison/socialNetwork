
const userModel = require('../models/user.model')
const objectID = require('mongoose').Types.ObjectId;

//Fonction qui permet de recupérer tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    const users = await userModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.getUserInfo = (req, res) => {
    //si l'id n'est pas valide alors ID unknown
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id)

    //cherhcer l'id dans la base donné si pas d'erreur afficher le contenu moins le password sinon afficher ID unknown
    userModel.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs) }
        else { console.log('ID unknow :' + err) }
    }).select('-password')
}

module.exports.updateUser = async (req, res) => {
    //si l'id n'est pas valide alors ID unknown
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id)

    try {
        userInfo = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true },

        )
        return res.status(200).json(userInfo)
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        await userModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfuly deleted." });
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.follow = async (req, res) => {
    if (!objectID.isValid(req.params.id) || !objectID.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        //ajouter l'id de lutilisateur qui est suivit a celui qui suit dans le tableau following
        dataUserFollow = await userModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
        )
        //res.json(dataUserFollow)
        //ajouter l'id de l'utilisateur qui suit dans la tableau follower de celui qui est suivit
        dataUserFollowing = await userModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
        )
        return res.status(201).json(dataUserFollowing)

    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.unfollow = async (req, res) => {
    if (!objectID.isValid(req.params.id) || !objectID.isValid(req.body.idToUnfollow))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        //ajouter l'id de lutilisateur qui est suivit a celui qui suit dans le tableau following
        dataUserUnfollow = await userModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
        )
        //res.json(dataUserFollow)
        //ajouter l'id de l'utilisateur qui suit dans la tableau follower de celui qui est suivit
        dataUserUnfollowing = await userModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
        )
        return res.status(201).json(dataUserUnfollowing)
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}