import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  const passwordGenerator = useCallback(
    () => {
      let pass =""
      let string= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if (numAllowed) {
        string += "0123456789"
      }
      if (charAllowed) {
        string += "~!@#$%^&*()=~"
      }

      for(let i= 1;i<length;i++){
        let char = Math.floor(Math.random()*string.length + 1)
        pass += string[char]
      }
      setPassword(pass)
     
    },
    [length,numAllowed,charAllowed,setPassword])
  
    const passwordRef= useRef(null)

    const copyToClipBoard = useCallback(
      () => {
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0,999)
        window.navigator.clipboard.writeText(password)
      },
      [password],
    )
    
    
   useEffect(()=>{
    passwordGenerator()
   },[length,numAllowed,charAllowed,passwordGenerator])

  return (
<>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-5 my-7 text-orange-500 bg-gray-700'>
    <h1 className='text-white text-center '>Password Generator</h1>
   <div className="flex shadow rounded-lg overflow-hidden mb-8 my-5">
    <input type ="text"
          placeholder='password'
          className='outline-none w-full py-1 px-3 bg-slate-200'
          value={password}
          readOnly
          ref = {passwordRef}


    ></input>
    <button onClick={copyToClipBoard}   className='outline none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
   </div>

   <div className='flex text-sm gap-x-2 '>
    <div className='flex items-center gap-x-1'>
      <input
           type="range"
           min={6}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange={(e)=>{setLength(e.target.value)}}
      />
      <label>length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox"  
      defaultChecked={numAllowed}
      id = "numberInput"
      onChange={()=>{setNumAllowed((prev)=>!prev)}}
      />
      <label htmlFor="numberInput">Number</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox"  
      defaultChecked={charAllowed}
      id = "characterInput"
      onChange={()=>{setCharAllowed((prev)=>!prev)}}
      />
      <label htmlFor="numberInput">Character</label>
    </div>
   </div>
   </div>
</>
  )
}

export default App
