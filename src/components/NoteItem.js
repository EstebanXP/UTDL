import React from 'react'
import { Button } from 'react-bootstrap'

function NoteItem(props) {
    return (
        <div>
            <h1>{props.item}</h1>   
            <Button variant="primary">Edit</Button>    
            <Button variant="danger">Delete</Button>   
            <hr></hr>  
        </div>
    )
}

export default NoteItem
