import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'


function App() {
 const [length,setLength]=useState(8);
const [numberAllowed,setNumberAllowed]=useState(false)
const [charAllowed,setCharAllowed]=useState(false);
const[password,setPassword]=useState("");

const passwordREf=useRef(null);


let clip=()=>{
  let h1=document.createElement('h1');
  h1.innerText="Copied to clipboard"
  let pg=document.querySelector("#pg");
  pg.append(h1);
  setTimeout(()=>{
    h1.remove()
    },2000)
}

const copyPasswordToClipBoard=useCallback(()=>{

  passwordREf.current.select()
  window.navigator.clipboard.writeText(password)
    // alert("Copy to clip board")
    

clip()
}
,[password])



const passwordGenerator=useCallback(()=>{
let pass="";
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if(numberAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%%^&*()_+=-`~"

  for(let i =1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length+1)
      pass =pass+str.charAt(char)
  }
  setPassword(pass)


  
},[length,numberAllowed,charAllowed,setPassword])
// passwordGenerator();

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,setPassword])
  return (


    <>
<div  id="pg" className='w-full max-w-md mx-auto sahdow-md rounded-lg px-4 my-8 text-white bg-slate-400 text-center p-5'>
  <h1>Password generator</h1>

<div className='flex shadow rounded-lg overflow-hidden mb-4'>



  <input 
  className='outline-none w-full py-1 px-3 text-black bg-blacks bg-white'
  type="text"
  value={password}
  placeholder='password'
  readOnly
ref={passwordREf}

  />

<button className='bg-blue-800 p-3 text-center'
onClick={copyPasswordToClipBoard}
>
  Copy
</button>

</div>
<div className='flex items-center gap-x-2 justify-center'>

<input type='range'
min={6}
max={100}
value={length}
className='cursor-pointer'
onChange={(e)=>{setLength(e.target.value)}}
/>
<label htmlFor="numberInput" >length {length}</label>

<div >
 <input
            type="checkbox" 
          defaultChecked= {numberAllowed}
          id="numberInput"
          onChange={
                ()=>{
                  setNumberAllowed((prev)=>!prev);
                }
          }   
          
          />
          <label htmlFor="numberInput">Numbers</label>
</div>
<div>
 <input
            type="checkbox" 
          defaultChecked= {charAllowed}
          id="charInput"
          onChange={
                ()=>{
                  setCharAllowed((prev)=>!prev);
                }
          }   
          
          />
          <label htmlFor="charInput">Characters</label>
</div>
</div>
</div >

    </>
  )
}

export default App
