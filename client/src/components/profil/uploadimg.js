import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {UploadPicture} from '../../actions/user.actions'

function UploadPdp() {

    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    function handlePdp(e){
        e.preventDefault();
         const data = new FormData();
         data.append("name", userData.pseudo);
         data.append("userId", userData._id);
         data.append("file", file)

         dispatch(UploadPicture(data, userData._id))
    }
    return (
        <form action='' className='upload-pdp' onSubmit={handlePdp}>
            <label htmlFor='file'>Changer de pdp</label>
            <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])}/>
            <br/>

            <input type="submit" value="Envoyer"/> 
        </form>
    )
}

export default UploadPdp
