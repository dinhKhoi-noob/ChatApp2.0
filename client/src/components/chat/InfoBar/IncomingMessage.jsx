import React from 'react'
import './InfoBar.css'
import ReactEmoji from 'react-emoji';
import {endPoint} from '../../../constants/url'

export default function IncomingMessage({text,name,time,avatar,files}) {
    const listFiles = files.length > 0 ? files.map(file=><embed src={`${endPoint}/${file.filePath}`}
    style={{width: "25%",border: "1px solid black" ,borderRadius:"3px" }}
    />):null
    const message = (text === "" || text === undefined) ? null:<><p><strong>{name}</strong></p>
    <p>{ReactEmoji.emojify(text)}</p>
    <span className="time_date"> {time} </span></>
    const content = !message && !listFiles?null:
    <div className="incoming_msg">
        <div class="incoming_msg_img"> <img src={avatar} alt="avatar"/></div>
        <div className="received_msg">
            <div className="received_withd_msg">
                {message}
                {listFiles}
            </div>
        </div>
    </div>
    return (
        <>{content}</>
    )
}
