"use client"
import { changeArrowIcon, sendArrowIcon, soundIcon } from "../components/icons"
import { useState } from 'react'


export default function Home() {

  const [inputLanguageOption, setInputLanguageOption] = useState('')
  const [outputLanguageOption, setOutputLanguageOption] = useState('')
  const [textareaValue, setTextareaValue] = useState("")

  const languageOptions = [
    { value: "", text: "-- --" },
    { value: "cn", text: "中文" },
    { value: "en", text: "英文" },
    { value: "jp", text: "日文" },
  ]

  const handleChangeInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLanguageOption(event.target.value)
  }

  const handleChangeOutput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputLanguageOption(event.target.value)
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value)
  }

  const handleChangeLanguage = () => {
    const inputValue = inputLanguageOption
    const outputValue = outputLanguageOption
    setInputLanguageOption(prev => outputValue)
    setOutputLanguageOption(prev => inputValue)
  }

  const handleSpeech = () => {
    // 創建 SpeechSynthesisUtterance 對象
    const utterance = new SpeechSynthesisUtterance(textareaValue);

    // 使用 SpeechSynthesis API 進行語音合成
    window.speechSynthesis.speak(utterance);
  }

  const translateFromGpt = async () => {
    const translateValue = `將 ${textareaValue} 翻譯成 ${outputLanguageOption}`
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY }`,
        
      },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: translateValue }] }),
    })

    const data = await response.json();
    console.log(data)
  }

  const handleSubmit = () => {
    translateFromGpt()
    setTextareaValue("")
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 text-center">
      <div className=' flex flex-col gap-3 w-[325px] border border-white p-4 rounded-md'>

        <div className='border border-white p-2 '>translate app</div>

        <div className='flex p-2 justify-around '>
          <select name="" id="" className='w-20 bg-transparent text-white border border-white p-1' onChange={e => handleChangeInput(e)} value={inputLanguageOption}>
            {
              languageOptions.map((languageOption) => <option key={languageOption.value} value={languageOption.value}>{languageOption.text}</option>)
            }
          </select>
          <button className='border border-white rounded-full p-2' onClick={handleChangeLanguage}>{changeArrowIcon}</button>
          <select name="" id="" className='w-20 bg-transparent text-white border border-white p-1' onChange={e => handleChangeOutput(e)} value={outputLanguageOption}>
            {
              languageOptions.map((languageOption) => <option key={languageOption.value} value={languageOption.value}>{languageOption.text}</option>)
            }
          </select>
        </div>

        <div className='w-full flex items-center border border-white p-2 gap-2'>
          <textarea name="" id="" className='w-full resize-none bg-transparent p-2 h-10 max-[200px]' value={textareaValue} onChange={e => handleChangeText(e)}></textarea>
          <button className='p-2 rounded border border-white text-white ' onClick={handleSubmit}>{sendArrowIcon}</button>
        </div>

        <div>translate ... </div>

        <div className='w-full border border-white h-48 p-2 flex flex-col gap-2 text-left'>
          <p className='border border-white grow p-2'> {textareaValue}</p>
          <button className='w-full border  rounded-sm p-1 text-center' onClick={handleSpeech}>Sound</button>
        </div>
      </div>

    </main>
  )
}
