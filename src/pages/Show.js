import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const weather = props.weather
  console.log(id);
  
  const indvweather = weather ? weather.find((p) => p._id === id ) : null

  const [ editForm, setEditForm ] = useState(indvweather)

  const [ isEditing, setIsEditing ] = useState(false)

  useEffect( () => {
    if (indvweather) {
        setEditForm(indvweather)
    }
  }, [indvweather])

  // handling form data change
  const handleChange = (e) => {
    setEditForm( {
      ...editForm,
     [e.target.name]: e.target.value 
    })
  }
  
  // handling submit event for edit form
  const handleUpdate = (e) => {
    e.preventDefault()
    props.updateWeather(editForm, editForm._id)
  }
  const handleEdit = () => (
    setIsEditing(prevState => !prevState)
  )
  const handleDelete = () => {
    props.deleteWeather(indvweather._id)
    navigate('/')
  }

  const loaded = () => {
    return (
      <>
        <h1>{indvweather.zip}</h1>
        <button onClick={handleEdit}>{ isEditing ? 'Cancel Edit' : 'Edit' }</button>
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="indvweather">
      { indvweather ? loaded() : loading() }
      { isEditing && 
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editForm.zip}
          name="zip"
          placeholder="zip"
          onChange={handleChange}
        />
        <input type="submit" value="Update Location" />
      </form>
    }     
      </div>
  )
}

export default Show;