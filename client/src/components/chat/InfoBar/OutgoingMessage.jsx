import React from 'react'
import './InfoBar.css'
import ReactEmoji from 'react-emoji';
import {endPoint} from '../../../constants/url'
import {Link} from 'react-router-dom'

export default function OutcomingMessage({text,time,files}) {
    const listFiles = files.length > 0 ? files.map(file=><Link to={`/${endPoint}/${file.filePath}`}><embed autoplay={false} src={`${endPoint}/${file.filePath}`}
    style={{ width: "25%",border: "1px solid black" ,borderRadius:"3px" }}
    /></Link>):null
    const message = text === '' || text === undefined ? null : <><p>{ReactEmoji.emojify(text)}</p>
    <span className="time_date">{time}</span></>
    const content = !message && !listFiles ? 
    null : 
    <div className="outgoing_msg">
        <div className="sent_msg">
            {message}
            {listFiles}
        </div>
    </div>
    return (
        <>
            {content}
        </>
    )
}
