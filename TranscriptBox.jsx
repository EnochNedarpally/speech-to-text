import { useEffect, useState } from 'react'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';
const TranscriptBox = () => {
    const  [isListening, setIsListening] = useState(false);
    const  [notes, setNotes] = useState("");
    const onListeningHandler=()=>{
        setIsListening(true);
    }
    const onStopListeningHandler=()=>{
        setIsListening(false);
    }
      const handleMic = () => {
        if (isListening) {
          mic.start()
          mic.onend = () => {
            // console.log('continue..')
            mic.start();
          }
        } else {
          mic.stop();
          mic.onend = () => {
            // console.log('Stopped Mic on Click')
          }
        }
        mic.onstart = () => {
        //   console.log('Mics on')
        }
    
        mic.onresult = event => {
            console.log("[Event Result]",event.results);
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          console.log(transcript)
          setNotes(transcript)
          mic.onerror = event => {
            console.log(event.error)
          }
        }
      }
      useEffect(() => {
        handleMic();
      }, [isListening]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <div className='container ' >
            <label htmlFor='exampleFormControlTextarea1' className='form-label '>
                        <h4 className='mt-5'>Transcript</h4>
                        </label>
                <div className='mb-3 d-flex align-items-center justify-content-center'>
                   
                    <div className='container border rounded' style={{minHeight:'20rem',width:'100%'}}>
                        <p>{notes}</p>
                    </div>
                </div>
                <button className='btn btn-success mx-2' onClick={onListeningHandler} disabled={isListening}>Start</button>
                <button className='btn btn-danger' onClick={onStopListeningHandler}>Stop</button>
                {isListening? <p className='mx-2 my-2'>Listening...!</p>:''}
            </div>
            
        </>
    )
}

export default TranscriptBox
