import React, { createContext,useState } from 'react'
import axios from 'axios'
import {apiUrl} from '../constants/url'

export const UploadingFileContext = createContext();

const UploadingFileContextProvider = ({children}) => {
    const [fileName,setFileName] = useState("");
    const [listFiles,setListFiles] = useState([]);

    const uploadSingleFile = async(data) => {
        try 
        {
            const response = await axios.post(`${apiUrl}/upload/singleFile`,data);
            if(response.data.success) {
                setFileName("");
                return response.data;
            }    
        } 
        catch (error) 
        {
            return error.response.data?error.response.data:{success:false,message:"Something was wrong"};
        }
    }

    const uploadMultipleFiles = async data => {
        try 
        {
            const response = await axios.post(`${apiUrl}/upload/multipleFile`,data);
            if(response.data.success) {
                setListFiles([]);
                return response.data;
            }
        } 
        catch (error) 
        {
            return error.response.data?error.response.data:{success:false,message:"Something was wrong"};
        }
    }

    const UploadingFileContextData={
        uploadSingleFile,
        fileName,
        setFileName,
        uploadMultipleFiles,
        listFiles,
        setListFiles
    }

    return (
        <UploadingFileContext.Provider value = {UploadingFileContextData}>
            {children}
        </UploadingFileContext.Provider>
    )
}

export default UploadingFileContextProvider