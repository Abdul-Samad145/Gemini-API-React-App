import React, { useState } from 'react'
import axios from 'axios'   
import './App.css'
import ReactMarkdown from "react-markdown";
import { Url } from './Url/Url'



function App()
 {
      const [prompt, setprompt] = useState("");
      const [response, setResponse] = useState("");
      const [loading, setLoading] = useState(false);

      const handleSubmit = async () => {
        try {

          setLoading(true);
         const {data}=await axios.post(Url, {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          }
        ]
      }
    ]
  })

     setLoading(false)
     setResponse(data.candidates[0].content.parts[0].text);          
        } catch (err) {
          console.error(err);
          setResponse("Error fetching response");
        }
      };



  return (
    <>
      <h1>This is API call Practice</h1>

      <div className='input1'>
        <input
         className='input'
          type="text"
          value={prompt}
          onChange={(e) => setprompt(e.target.value)}
          placeholder="Ask question "
        />


        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </div>


      <div className='respons'>
        <h2>Response :</h2>
       
      <div className="response1">
      <ReactMarkdown>{response}</ReactMarkdown>
    </div>


      </div>
    </>
  )
}

export default App
