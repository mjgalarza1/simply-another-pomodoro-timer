import TimerInput from "./TimerInput.jsx";
import CloseButton from "../assets/imgs/icons/close-svgrepo-com.svg";
import {useEffect} from "react";

function SettingsWindow({ close, pomodoroDuration, shortBreakDuration, longBreakDuration, alarmVolume, setPomodoroDuration, setShortBreakDuration, setLongBreakDuration, setAlarmVolume }) {

    const handleVolume = (event) => {
        setAlarmVolume(event.target.value)
    }

    // Dynamically changes the volume bar color.
    useEffect(() => {
        const volumeSlider = document.getElementById("volume-slider");
        volumeSlider.style.background = `linear-gradient(to right, #464646 ${alarmVolume * 100}%, #FFFFFF ${alarmVolume * 100}%)`;
    }, [alarmVolume]);

    return (
        <div id="modal-container" className="fixed inset-0 flex justify-center items-center bg-[#4F5B60]/70 z-50 backdrop-blur-[50px]">

            <div id="settings-container" className="rounded-[32px] bg-white shadow-[0_20px_15px_0_rgba(0,0,0,0.4)]">

                <div id="title-wrapper" className="flex flex-row justify-between items-center py-5 ">
                    <h2 id="title" className="font-fredoka text-4xl tracking-[8px] text-[#464646] pl-8">SETTINGS</h2>
                    <div id="close-button" onClick={close} className="w-[26px] h-[26px] mr-5">
                        <button className="hover:cursor-pointer">
                            <img src={CloseButton} alt="X"/>
                        </button>
                    </div>
                </div>

                <div id="settings-wrapper"
                     className="flex flex-col shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)] px-6">
                    <div id="timers-wrapper" className="flex flex-row gap-8 py-6">
                        <TimerInput title="Pomodoro" minutes={pomodoroDuration} state={setPomodoroDuration}/>
                        <TimerInput title="Short break" minutes={shortBreakDuration} state={setShortBreakDuration}/>
                        <TimerInput title="Long break" minutes={longBreakDuration} state={setLongBreakDuration}/>
                    </div>

                    <div id="alert-volume-wrapper" className="flex flex-col gap-2 border-t-1 border-[#B1B4C9] py-6 pb-12">
                        <label htmlFor="volume-slider" className="font-fredoka text-[26px] font-medium text-[#464646]">
                            Alarm volume: {Math.round(alarmVolume * 100)}%
                        </label>
                        <input
                            id="volume-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={alarmVolume}
                            onChange={handleVolume}
                            className="w-full h-3 rounded-full border-1 border-[#464646] appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>

)
}

export default SettingsWindow
