import React from 'react'

interface I_Textarea {
    className?:string,
    
}

function Textarea({...arg}:I_Textarea) {
  return (
    <textarea  
    className='w-full resize-none bg-transparent p-2 h-10 max-[200px]' 
    {...arg}
    />

  )
}

export default Textarea
