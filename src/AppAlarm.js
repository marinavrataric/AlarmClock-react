import React, { Component } from 'react'

import soundFile from './alarmbell.mp3'

class AppAlarm extends Component {
    constructor(){
        super()
        this.state = {
            timeNow: new Date().toLocaleTimeString('en-US', { hour12: false }) ,
            alarm: ''
        }
        this.setAlarm = this.setAlarm.bind(this)
        this.startAlarm = this.startAlarm.bind(this)
        this.stopAlarm = this.stopAlarm.bind(this) 
        this.snoozeAlarm = this.snoozeAlarm.bind(this)
    }

    alarmSound = new Audio(soundFile)

    componentWillMount(){
        setInterval(() => {
           this.setCurrentTime()
        }, 1000)     
    }

    setCurrentTime(){
        this.setState({ 
            timeNow: new Date().toLocaleTimeString('en-US', { hour12: false }),
        })
    }

    setAlarm(e){
        const updatedAlarm = e.target.value + ':00'
        this.setState({
           alarm: updatedAlarm
        })
    }

    startAlarm(){
        const startAlarmDisplayTxt = document.querySelector('.alarmInfoTxt')

        setInterval(() => {
            this.setCurrentTime()
            if(this.state.alarm === this.state.timeNow){
                this.alarmSound.play()

                this.alarmSound.loop = true;

                startAlarmDisplayTxt.innerHTML = 'Alarming'
                document.querySelector('.btnSnooze').style.display = 'inline-block'
            }  
         }, 1000)
           
        if(this.state.alarm > this.state.timeNow) {
            startAlarmDisplayTxt.innerHTML = `You set alarm at ${this.state.alarm}` 
        }else if(this.state.alarm < this.state.timeNow && this.state.alarm){
            startAlarmDisplayTxt.innerHTML = 'Your time is up'
        }
    }

    stopAlarm(){
        this.alarmSound.pause()
        const alarmInput = document.querySelector('.inputAlarm').value

        if(alarmInput === ''){
            document.querySelector('.alarmInfoTxt').innerHTML = ``
        }else{
            document.querySelector('.alarmInfoTxt').innerHTML = `Alarm stopped`
            document.querySelector('.btnSnooze').style.display = 'none'
        }
    } 

    snoozeAlarm(){
        this.alarmSound.pause()
        this.alarmSound.currentTime = 0
        setTimeout(() => {
            this.alarmSound.play()
        }, 5000);
        document.querySelector('.alarmInfoTxt').innerHTML = `Alarm snoozed for 5 seconds`
    }

    render(){    
        return(
            <div className="alarmContainer">
                <h1 className="timeNow">{this.state.timeNow}</h1>
                <h1 className="alarmText">Please enter alarm:</h1>
                <input className="inputAlarm" type="time" onChange={this.setAlarm}></input> <br/>               
                <h1 className="alarmInfoTxt"></h1> <br/>
                <button className="btn btnStart" onClick={this.startAlarm}>Start</button>                
                <button className="btn btnStop" onClick={this.stopAlarm}>Stop</button>
                <button className="btn btnSnooze" onClick={this.snoozeAlarm}>Snooze</button>
            </div>
        )
    }
}

export default AppAlarm