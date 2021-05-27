import React from 'react'
import ButtonGroup from './ButtonGroup'

const OwnerRoom = ({room}) => {
    return (
        <div className="card text-white bg-primary col-lg-12 col-md-12 col-xs-12 col-sm-12 mt-3">
            <div className="card-body row">
                <div className="col-lg-9 col-md-9 col-xs-9 col-sm-9 mt-2" style={{padding:'0px'}}>
                    <h4 className="card-title">
                        {room.roomName}
                    </h4>
                    <p className="card-text">Some sayings</p>
                </div>
                <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 mt-2" style={{padding:'0px'}}>
                    <ButtonGroup type="owner" room={room}/>
                </div>
            </div>
        </div>
    )
}

export default OwnerRoom
