import React, { useState } from 'react'
import "./Home.css"
const Home = () => {

    const [second,setSecond]=useState(0);
    const [minute,setMinute]=useState(0);
    const [hour,setHour]=useState(0);
    const [pause,setPause]=useState(false)
    const [intervalId,setIntervalId]=useState(null)
    const [start,setstart]=useState("Start");
    const [lapnumber,setLapnumber]=useState(1)

    let updatedS=second;
    let updatedM=minute
   
    const  run =()=>{
        if(minute===60){
      
           updatedM=0
        }
        if (second===60){
            updatedM+=1
            updatedS=0
        }
        else{
           updatedS+=1
        }
     }


    const startButton= ()=>{
        if (pause!==true){
            setstart("Pause");
            const id= setInterval(() => {
               
                run();
                
                if(updatedM===60){
                    setHour((h)=>h+1);
                    setMinute(0);
                    setSecond(0);
                }
                if (updatedS===60){
                    setMinute((m)=> m+1);
                    setSecond(0);
                }
                else{
                    setSecond((s)=>s+1)
                    console.log(updatedS)
                }
               
                   
            }, 1000);
            console.log("HI");
            setIntervalId(id);
            setPause(true)
        }else{
            setstart("Start")
        clearInterval(intervalId);
        setPause(false)
        }
    }
 

    const resetButton=()=>{
        clearInterval(intervalId);
        setHour(0);
        setMinute(0);
        setSecond(0);
        setPause(false);
        setstart("Start")
    }
    const lapButton =()=>{
        setLapnumber(lapnumber+1)
        const laps=document.getElementById("laps");
        let newDiv= document.createElement("div");
        newDiv.classList.add("lapcolumn");
        newDiv.innerHTML=`<h3> #${lapnumber} </h3> <h3>${hour < 10 ? '0' + hour : hour} : ${minute < 10 ? '0' + minute : minute} :  ${second < 10 ? '0' + second : second}</h3>`
        laps.appendChild(newDiv)
    }
   
  return (
    <>
    <div className='header'>
       <h1>Stopwatch By Anurag</h1>
    </div>
    <div className="timer">
        <div className="timer-value">
               <h1> {hour < 10 ? '0' + hour : hour} : {minute < 10 ? '0' + minute : minute} :{' '}
            {second < 10 ? '0' + second : second}</h1>
        </div>
        <div className="button-group">
            <button onClick={startButton} className='btn start'>{start}</button>
           
            <button onClick={resetButton} className='btn reset'>Reset</button>
            <button onClick={lapButton} className='btn lap'>Lap</button>


        </div>
        
    </div>
    <div className="laps" id="laps">
        
        
        
       
    </div>
    </>
  )
}

export default Home
