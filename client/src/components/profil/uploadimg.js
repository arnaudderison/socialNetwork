import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UploadPicture } from '../../actions/user.actions'

function UploadPdp() {
    const [onSubmit, setOnSubmit] = useState(false);
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    function handlePdp(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file)

        dispatch(UploadPicture(data, userData._id))
        handleInout()
    }
    function handleInout() {
        setOnSubmit(false)
    }
    return (
        <form action='' className='upload-pdp' onSubmit={handlePdp}>
            <div className='pdp-info'>
                <label htmlFor='file' className='pdp-edit-icon'><img src='./images/pdp_modif.svg' alt='Modifie' width="15" onClick={()=>setOnSubmit(true)} /></label>
                <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <br />

                {onSubmit && (
                    <>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <input type="submit" value="Envoyer" className='pdp-btn' />
                    <br/>
                    
                    </>
                )}
        </form>
        
    )
}

export default UploadPdp
