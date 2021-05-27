import React,{useContext} from 'react'
import {UploadingFileContext} from '../../../contexts/UploadingFileContext'
import fileImage from '../../../assets/icons/file-image.svg'
import linkImage from '../../../assets/icons/link-45deg.svg'
import telegramIcon from '../../../assets/icons/telegram.svg'
import './InfoBar.css'

export default function Input({socket,chatroomId}) {
    const [message,setMessage] = React.useState("");
    const {listFiles,setListFiles,uploadMultipleFiles} = useContext(UploadingFileContext);

    const sendMessage = async()=>{
        let file = new FormData();
        let response;
        if(socket){
            if(listFiles.length > 0)
            {
                for(let i = 0; i < listFiles.length;i++)
                    file.append('files',listFiles[i]);
                response = await uploadMultipleFiles(file);
            }
            else
            {
                response = {
                    file:{
                        files:[]
                    }
                }
            }
            socket.emit("chatroomMessage",{
                chatroomId,
                message,
                files:response.file.files
            })
        }
        setMessage("");
    }

    const onChange = (event)=>{
        setMessage(event.target.value);
    }

    const onUploadFiles = event => {
        setListFiles(event.target.files);
    }

    return (
        <div className="type_msg container">
            <div className="input_msg_write">
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-xs-9 col-sm-9">
                        <input 
                        type="text"
                        value = {message}
                        onKeyPress={event => event.key === "Enter" ? sendMessage:null}
                        onChange={onChange}
                        placeholder="Type a message" />
                    </div>
                    <div className="text-right col-lg-1 col-md-1 col-xs-1 col-sm-1">
                        <input
                        type="file"
                        className="file"
                        id="file"
                        accept="image/*"
                        multiple
                        onChange={onUploadFiles}
                        />
                        <label className="lb" for="file">
                            <img src={fileImage} style={{width:"100%"}}/>
                        </label>
                        <p className="file-input"></p>
                    </div>
                    <div className="col-lg-1 col-md-1 col-xs-1 col-sm-1">
                    <input
                        type="file"
                        className="file"
                        accept="file_extension||audio/*||video/*||image/*||media_type"
                        id="file2"
                        onChange={onUploadFiles}
                        />
                        <label className="lb" for="file2">
                            <img src={linkImage} style={{width:"100%"}}/>
                        </label>
                        <p className="file-input"></p>
                    </div>
                    <div className="col-lg-1 col-md-1 col-xs-1 col-sm-1">
                        <label className="lb">
                            <img onClick={sendMessage} src={telegramIcon} style={{width:"100%"}}/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}