import React,{useContext} from 'react'
import {UploadingFileContext} from '../../contexts/UploadingFileContext'

const UploadingFileBar = () => {
    const {fileName,listFiles,setListFiles,setFileName,uploadSingleFile,uploadMultipleFiles} = useContext(UploadingFileContext);

    const uploadFiles = async() => {
        const file = new FormData();
        if(listFiles.length > 0)
            for(let i = 0; i < listFiles.length; i++)
                file.append('files',listFiles[i]);
        await uploadMultipleFiles(file);
        console.log(file);
    }
    const uploadFile = async () => {
        const file = new FormData();
        file.append('file',fileName);
        await uploadSingleFile(file);
    }
    const onChangeListFiles = event =>{
        setListFiles(event.target.files);
        console.log(listFiles);
    }
    const onChangeFileName = (event) => {
        setFileName(event.target.files[0]);
    }

    return (
        <div className="form-group">
            <span className="badge badge-primary">Choose your avatar</span>
            <input type="file" className="form-control" onChange={onChangeFileName} aria-describedby="fileHelpId"/>
            <button type="button" className="btn btn-outline-warning" onClick = {uploadFile}>Upload</button>
            <input type="file" className="form-control" onChange={onChangeListFiles} aria-describedby="fileHelpId" multiple/>
            <button type="button" className="btn btn-outline-warning" onClick = {uploadFiles}>Upload Files</button>
        </div>
    )
}

export default UploadingFileBar;