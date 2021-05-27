import React from 'react'
import ButtonGroup from './ButtonGroup'

const OtherRoom = ({room}) => {
    return (
        <div className="card text-white bg-success col col-lg-12 col-md-12 col-xs-12 col-sm-12 mt-3">
            <div className="card-body row">
                <div className="col col-lg-10 col-md-10 col-xs-10 col-sm-10 mt-2" style={{padding:"0px"}}>
                    <h4 className="card-title">
                        {room.roomName}
                    </h4>
                    <p className="card-text">Some sayings</p>
                </div>
                <div className="col col-lg-2 col-md-2 col-xs-2 col-sm-2 mt-2" style={{padding:"0px"}}>
                    <ButtonGroup type="other" room={room}/>
                </div>
            </div>
        </div>
    )
}

export default OtherRoom
