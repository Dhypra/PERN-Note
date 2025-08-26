import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Detail = () => {
  const [noteDetails, setNoteDetails] = useState([])
  const {id}=useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/api/note/details/${id}`).then((res) => {
      setNoteDetails(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])
  return (
    <div>
      {noteDetails.map((note) => {
        return (
          <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <p>{note.created_at}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Detail
