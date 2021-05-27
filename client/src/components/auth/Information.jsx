import React,{useContext,useState,useEffect} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import {UploadingFileContext} from '../../contexts/UploadingFileContext'
import {endPoint} from '../../constants/url'

const Information = () => {
    const {authState:{user},editProfile,loadUser} = useContext(AuthContext);
    const {uploadSingleFile,fileName,setFileName} = useContext(UploadingFileContext);
    const [account,setAccount] = useState({
        username:user.username,
        chatname:user.chatName,
        password:user.password,
        confirmPassword:''
    })
    const [editing,setEditing] = useState(false);
    const {username,chatname,password,confirmPassword} = account;

    useEffect(()=>{
        loadUser();
    },[])

    const uploadAvatar = (event) => {
        setFileName(event.target.files[0]);
    }

    const onChangeText = (event) => {
        setAccount({...account,[event.target.name]:event.target.value});
    }

    const onSaveChanges = async(event) => {
        event.preventDefault();
        try 
        {
            const file = new FormData();
            file.append("file",fileName);
            let response;
            if(fileName)
                response = await uploadSingleFile(file);
            const data = {
                username,
                password,
                chatname,
                avatar : response?endPoint+'/'+response.file.filePath:`${endPoint}/uploads/2021-05-16T02-11-02.795Z-1024px-User-avatar.svg.png`
            }
            console.log(data,response);
            editProfile(data);
            setEditing(!editing);    
        } 
        catch (error) 
        {
            alert("error");
            console.error(error);
        }
    }
    return (
        <div className="container">
            <h4>Hello {user.chatName}, how are you today ?</h4>
            <button type="button" className="btn btn-outline-warning" onClick={()=>setEditing(!editing)}>Edit your profile</button>
            <form className="form-group" onSubmit={onSaveChanges}>
                <span>Username:</span>
                <input type="text"
                className="form-control" aria-describedby="helpId" value={username} disabled/>
                <span>Chatname:</span>
                <input type="text" name="chatname"
                className="form-control" aria-describedby="helpId" value={chatname} disabled={!editing} onChange={onChangeText}/>
                <span>Password:</span>
                <input type="password" name="password"
                className="form-control" aria-describedby="helpId" value={password} disabled={!editing} onChange={onChangeText}/>
                {editing?
                <><span>Confirm Password:</span>
                <input type="password" name="confirmPassword"
                className="form-control" aria-describedby="helpId" value={confirmPassword} onChange={onChangeText}/></>:null
                }
                <span>Select your avatar:</span>
                <input type="file"
                className="form-control" aria-describedby="helpId" disabled={!editing} onChange={uploadAvatar}/>
                {editing?<button type="submit" style={{marginTop:'20px'}} className="btn btn-primary">Save Changes</button>:null}
            </form>
        </div>
    )
}

export default Information