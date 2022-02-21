import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function NewPost() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [video, setvideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);

    function handlePicture(e) {

    }

    function handlePost() {

    }

    function cancelPost() {
        setMessage('')
        setPostPicture(null)
        setvideo('')
        setFile('')
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    function handlevideo() {
        let findLink = message.split(' ');
        findLink.forEach(mot => {
            if (mot.includes('https://www.youtube.com') || mot.includes('https://youtube.com')) {
                validURL(mot)
                if(validURL(mot)){
                    let embed = mot.replace('watch?v=', 'embed/');
                    setvideo(embed.split('&')[0])
                    findLink.splice(findLink.indexOf(mot), 1)
                    setMessage(findLink.join(' '))
                    setPostPicture(null)
                }else{
                    let error = message.replace(mot, '[LIEN NON VALIDE]')
                    setMessage(error)
                    setvideo('')
                }


            }
        });

        //console.log(findLink)
        //console.log(message)
    }
    useEffect(() => {
        if (userData) setIsLoading(false);
        handlevideo();
    }, [userData, message, video])

    return (
        <div className='newPost-container'>
            {
                isLoading ? (
                    <i className='fas fa-spinner fa-pulse'></i>
                ) : (
                    <>
                        <div className='header'>
                            <Link to="/profil">
                                <img
                                    src={userData.picture}
                                    alt=""
                                    width={50}
                                />
                            </Link>
                        </div>

                        <div className='newPost-form'>
                            <textarea
                                name='message'
                                id='message'
                                placeholder='Quoi de neuf ?'
                                onChange={(e) => setMessage(e.target.value)}
                                value={
                                    message && message
                                }
                            />
                            {
                                message || postPicture || video.length > 20 ? (
                                    <li className='card-post'>
                                        <div className='card-post-left'>
                                            <img src={userData.picture} alt='' />
                                        </div>
                                        <div className='card-post-right'>
                                            <div className='post-header'>
                                                <div className='post-titre'>
                                                    <div className='post-pseudo'>
                                                        <h3>{userData.pseudo}</h3>
                                                        <span>
                                                            {
                                                                userData.isCertified && (
                                                                    <img src='./images/verified.svg' alt='' width='13' />
                                                                )
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                {
                                                    <p>
                                                        {message}
                                                    </p>
                                                }
                                            </div>

                                            <div className='img'>
                                                <img src={postPicture} alt="" />
                                                {
                                                    video && (
                                                        <iframe width="500" height="300" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                                                        </iframe>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ) : null
                            }
                        </div>

                        <div className='newPost-footer'>
                            <div className='icon'>
                                {
                                    !video && (
                                        <>
                                            <i class="fa-solid fa-image"></i>
                                            <input type="file" id="fileUpload" name="file" accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)}/>
                                        </>
                                    )
                                }
                            </div>
                            {
                                video && (
                                    <button onClick={() => setvideo('')}>Suprimmer vidéo</button>
                                )
                            }
                            <div className='btn-send'>
                                {
                                    message || postPicture || video.length > 20 ? (

                                        <button className='btn-add' onClick={cancelPost}>Annuler </button>
                                    ) : null
                                }
                                <button className='btn-add' onClick={handlePost}>Envoyer</button>
                            </div>

                        </div>
                    </>
                )
            }
        </div>
    )
}

export default NewPost
