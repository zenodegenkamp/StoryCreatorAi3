import React from 'react'
import { fetchBotReply } from '../pages/api/hello'
import { fetchShortStory } from '../pages/api/hello'
import { fetchUrlForImage } from '../pages/api/hello'
import { fetchImage } from '../pages/api/hello'

export default function StoryForm(props) {


    
    const [formData, setFormData] = React.useState({
        mainCharacter: "",
        plot: ""
      })
      const [submitted, setSubmitted] = React.useState(false);
    
      // Checks if changes are made to form, if so change the state 
      function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      }
    
      // Checks if form is submitted and checks if valid, then changes submitted to true
      function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          setSubmitted(true);
        }
      }
    
      // If form data is correct send to stort page
      if (submitted) {
        // props.setInputValue(formData)
        props.setInputValue(formData)

    
      }

    return (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-white text-sm font-medium mb-1" htmlFor="mainCharacter">
            Main Character
          </label>
          <input
            className="form-input p-4 mt-2 rounded-md glassmorphism"
            type="text"
            name="mainCharacter"
            id="mainCharacter"
            placeholder="Main Character"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-white text-sm font-medium mb-1" htmlFor="plot">
            Plot - 1 short sentence 
          </label>
          <input
            className="form-input p-4 mt-2 rounded-md glassmorphism"
            type="text"
            name="plot"
            id="plot"
            placeholder="walks to a mystic garden"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-button-container">
          <button class="mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"type="submit">
            Create
          </button>
        </div>
      </form>
    );
  }
  
  
  
 