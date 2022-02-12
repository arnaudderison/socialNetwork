const { send } = require('express/lib/response');
const postModel = require('../models/post.model')
const userModel = require('../models/user.model')
const objectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data: ' + err)
    }).sort({ createdAt: -1 })
}

module.exports.createPost = async (req, res) => {
    let fileName;

    if (req.files) {
        if (
            req.files.filePost.mimetype != 'image/jpeg' &&
            req.files.filePost.mimetype != 'image/jpg' &&
            req.files.filePost.mimetype != 'image/png'
        ) throw Error('Invalid File')

        if (req.files.filePost.size > 500000) throw Error('Invalid Size')
        let file = req.files.filePost

        fileName = req.body.posterId + Date.now() + '.jpg'

        file.mv(`${__dirname}/../client/public/upload/posts/${fileName}`);
    }

    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.files ? "./upload/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
    })

    try {
        const post = await newPost.save()
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updatePost = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id)

    try {
        const updatedRecord = {
            message: req.body.message
        }

        post = await postModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true },
        )
        return res.status(400).json(post)
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports.deletePost = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        response = await postModel.findByIdAndDelete(req.params.id)
        res.status(201).json(response)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.likePost = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        responsePostAddLikers = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
        )
        responseUserLike = await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
        )
        return res.status(200).json({ postAddLiker: responsePostAddLikers, userLike: responseUserLike })
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports.unLikePost = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        responsePostUnLikers = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
        )
        responseUserUnlike = await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
        )
        return res.status(200).json({ postAddUnliker: responsePostUnLikers, userUnlike: responseUserUnlike })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.commentPost = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        response = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamps: new Date().getTime()
                    },
                },
            },
            { new: true },
        )

        return res.status(200).send(response)
    } catch (err) {
        return res.status(400).send({ err })
    }
}

module.exports.editCommentPost = (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
    try {

        return postModel.findById(
            req.params.id,
            (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                )

                if (!theComment) return res.status(404).send('Comment Not Found')
                theComment.text = req.body.text

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs)
                    return res.status(500).send('ERROR')
                })
            }
        )

    } catch (err) {
        return res.status(400).send(err)
    }

}

module.exports.deleteCommentPost = (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.status(200).send(docs)
                else return res.status(401).send(err)
            }
        )
    } catch (err) {
        res.status(400).send(err)
    }
}