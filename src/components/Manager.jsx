import React from 'react'
import { useRef,useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const ref =useRef()
    const passwordRef=useRef()

const [form, setform] = useState({site:"",username:"",password:""})

const [passwordArray, setPasswordArray] = useState([])

useEffect(() => {
    let passwords=localStorage.getItem("passwords")
    if(passwords){
    setPasswordArray(JSON.parse(passwords))
    }
 
}, [])


const copyText=(text)=>{
    toast('Copied to clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    navigator.clipboard.writeText(text)
  
}







const showPassword=() => {
 passwordRef.current.type="text"
  if( ref.current.src.includes("/eyecross.png")){
      passwordRef.current.type="text"
      ref.current.src="/eye.png"
    }
    else{
        
        passwordRef.current.type="password"
        ref.current.src="/eyecross.png"
    }
}


const savePassword=() => {
    if(form.site.length >3 && form.username.length >3 && form.password.length>3){

        setPasswordArray([...passwordArray,{...form,id:uuidv4()}])
        
        localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id:uuidv4()}]))
        setform({site:"",username:"",password:""})
        toast('Password saved !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
        });
    }
    else{
        toast('Error:Password not saved !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
        });

    }

}

   const deletePassword=(id) => {
    let c =confirm("Do you really want to delete this password?")
    if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
            });



    }
      
    }

    const editPassword=(id) => {
       
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    
          
        }



const handleChange =(e) => {
    setform({...form,[e.target.name]:e.target.value})
  
}





  return (
    
 <>
 
 <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>






 

<div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
 
 <div className="p-3  md:mycontainer min-h-[70vh]  bg-slate-100   mx-30 py-16 ">

    <h1 className='text-4xl font-bold text-center'>
    <span className='text-green-500'>     &lt;  </span>
         <span>Pass</span>
          <span className='text-green-500'>OP/ &gt;  </span>
       
    </h1>
 

   <p className='text-green-900  text-lg  text-center'>Your own Password Manager</p>

<div className=" flex flex-col p-4 text-black gap-8 items-center">

<input value={form.site}    onChange={handleChange}   placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="site" id="site" />
<div className="flex  md:flex w-full justify-between gap-8">

<input    value={form.username}  onChange={handleChange}  placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="username" id="username" />

<div className="relative">


<input ref={passwordRef} value={form.password} onChange={handleChange}   placeholder='Enter Password'  className='rounded-full border border-green-500 w-full p-4 py-1 ' type="password" name="password" id="password" />

<span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showPassword}>
    <img  ref={ref}   className='p-1'   width={26} src="/eye.png" alt="eye" />
</span>

</div>

</div>


<button  onClick={savePassword}    className='flex  justify-center  gap-2 items-center bg-green-600 hover:bg-green-500 rounded-full px-8 py-2 w-fit border border-green-900 '>
<lord-icon
  src="https://cdn.lordicon.com/jgnvfzqg.json"
  trigger="hover">
</lord-icon>
    Save</button>


</div>


<div className="passwords">
    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
    {passwordArray.length=== 0 && <div>No passwords to show</div> }
    {passwordArray.length !=0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
  <thead className='bg-green-800  text-white'>
    <tr>
      <th className='py-2'>Site</th>
      <th className='py-2'>Username</th>
      <th className='py-2'>Password</th>
      <th className='py-2'>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-green-100'>
    {passwordArray.map((item,index )=>{
    
    return<tr key={index}>
      <td className='  py-2 border border-white text-center ' >
        <div className='flex items-center justify-center'>
    
        <a href={item.site} target='_blank'>{item.site}</a>
      <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.site)}}  >
        
      <lord-icon
      style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px" }}
      src="https://cdn.lordicon.com/iykgtsbt.json"
      trigger="hover"
      
      >
           

      </lord-icon>
          </div>
          </div>



      </td>
      <td className=' py-2 border border-white text-center ' >
      <div className='flex items-center justify-center'>
        <span>{item.username}</span>
      <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.username)}}  >
        
        <lord-icon
        style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px" }}
        src="https://cdn.lordicon.com/iykgtsbt.json"
        trigger="hover"
        
        >
             
  
        </lord-icon>
            </div>
            </div>
      </td>
      <td className='   py-2 border border-white text-center ' >
      <div className='flex items-center justify-center'>
        <span>{item.password}</span>

      <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.password)}}   >
        
      <lord-icon
      style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px" }}
      src="https://cdn.lordicon.com/iykgtsbt.json"
      trigger="hover"
      
      >
           

      </lord-icon>
          </div>
          </div>

      </td>
      <td className='   py-2 border border-white text-center ' >
      <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
      

        <lord-icon
    src="https://cdn.lordicon.com/gwlusjdu.json"
    trigger="hover"
    style={{"width":"25px", "height":"25px"}}>
       </lord-icon>

      </span>
      <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
      

      <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    style={{"width":"25px", "height":"25px"}}>
     </lord-icon>

    </span>

      </td>
    </tr>

    })}
   
  </tbody>
</table>}
</div>



 </div>

 
 
 </>     

   
  )
}

export default Manager
