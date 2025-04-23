import { useState,useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import './App.css'
import Editor from 'react-simple-code-editor';

function App() {
  const [code,setCode]=useState(``);
  const [review,setReview]=useState(``);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    prism.highlightAll()
  },[])
  async function reviewCode(){
    setLoading(true);
    try{
      const response=await axios.post("https://aicode-reviewer-backend-kxzy.onrender.com",{code})
    setReview(response.data);
    }catch(error){
      setReview("❌ Error while reviewing code.")
    }
    setLoading(false);
    
  }
  return (
    
    <main>
    <div className="left"> 
      <div className="code">
        <Editor
        placeholder='Type your code here for review'
        value={code}
        onValueChange={code=>setCode(code)}
        highlight={code=>prism.highlight(code,prism.languages.javascript,"javascript")}
        padding={10}
        style={{
          color:'white',
          fontFamily: 'Fira Code, Fira Mono, monospace',
          fontSize:16,
          // border:"1px solid #ddd",
          // borderRadius:"5px",
          // height:"100%",
          width:"100%",
          // overflowY:"auto"
        }}
        />
      </div>
      <div className="review" onClick={
        reviewCode
      }>{loading?"⏳ Reviewing...":"Review"}</div>
    </div>
    <div className="right">

      {loading?(
        <div className='spinner-container'>
          <div className='spinner'></div>
          <p>⌛ Please wait, reviewing code...</p>
          </div>
      ):(
      <Markdown
      rehypePlugins={[rehypeHighlight]}
    >{review}</Markdown>)}
    </div>
    </main>
    
    
  )
}

export default App
