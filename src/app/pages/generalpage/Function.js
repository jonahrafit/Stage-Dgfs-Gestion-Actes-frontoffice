import React from "react"

export function Information(props) {
    return (
        <div>
            <div className="media">
                <div className="media-body">
                    {props.labelname} : <b>{props.labelvalue}</b>
                </div>{/* media-body */}
            </div>{/* media */}
        </div>
    )
}

