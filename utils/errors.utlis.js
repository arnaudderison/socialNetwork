module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' }

    if (err.message.includes('pseudo'))
        errors.pseudo = "Votre pseudo n'est pas correcte ou est déjà utilisé"
    if (err.message.includes('email'))
        errors.email = "Votre adresse mail n'est pas correcte ou est déjà utilisé"
    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minimum"
    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "Votre pseuso est déjà utilisé"
    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Votre adresse email est déjà utilisé"

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" }
    if (err.message.includes('email')) errors.email = "L'adresse mail n'est pas valide"
    if (err.message.includes('password')) errors.password = "Le mot de passe n'est pas correcte"


    return errors
}

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' }

    if(err.message.includes('Invalide File')) errors.format = "Le format de l'image n'est pas prit en charge !"
    if(err.message.includes('Max size')) errors.maxSize = "Votre image est trop volumineuse"

    return errors
}