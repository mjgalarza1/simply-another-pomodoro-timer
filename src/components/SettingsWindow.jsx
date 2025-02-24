import TimerInput from "./TimerInput.jsx";
import CloseButton from "../assets/imgs/icons/close-svgrepo-com.svg";
import {useEffect, useState} from "react";

function SettingsWindow({ close, pomodoroDuration, shortBreakDuration, longBreakDuration, alarmVolume, setPomodoroDuration, setShortBreakDuration, setLongBreakDuration, setAlarmVolume }) {

    const [isOpening, setIsOpening] = useState(true);
    const [isClosing, setIsClosing] = useState(false)

    const handleVolume = (event) => {
        setAlarmVolume(event.target.value)
    }

    const handleClosing = () => {
        setIsClosing(true)
    }

    // Dynamically changes the volume bar color.
    useEffect(() => {
        const volumeSlider = document.getElementById("volume-slider");
        volumeSlider.style.background = `linear-gradient(to right, #464646 ${alarmVolume * 100}%, #FFFFFF ${alarmVolume * 100}%)`;
    }, [alarmVolume]);

    // Disables body overflow when SettingsWindow is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Waits for fadeOut and slideOut transitions to finish before closing
    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                close()
                setIsOpening(false)
            }, 150);
        }
    }, [isClosing]);

    return (
        <div id="modal-container" className={
            `fixed inset-0 flex justify-center items-center bg-[#4F5B60]/70 z-50 backdrop-blur-[50px] [@media(max-height:400px)]:items-start overflow-y-auto
            ${isOpening ? "animate-settingsFadeIn" : ""}
            ${isClosing ? "animate-settingsFadeOut" : ""}
            `}>

            <div id="settings-container" className={
                `rounded-[32px] bg-white shadow-[0_20px_15px_0_rgba(0,0,0,0.4)] my-6 max-[560px]:w-[95vw]
                ${isOpening ? "animate-settingsSlideIn" : ""}
                ${isClosing ? "animate-settingsSlideOut" : ""}
                `}>

                <div id="title-wrapper" className="flex flex-row justify-between items-center py-5 ">
                    <h2 id="title" className="font-fredoka text-4xl tracking-[8px] text-[#464646] pl-8 truncate max-w-full max-[470px]:tracking-[1vw] max-[470px]:text-[18px]">SETTINGS</h2>
                    <div id="close-button" onClick={handleClosing} className="w-[26px] h-[26px] min-w-[26px] min-h-[26px] mr-5">
                        <button className="hover:cursor-pointer">
                            <img src={CloseButton} alt="X"/>
                        </button>
                    </div>
                </div>

                <div id="settings-wrapper"
                     className="flex flex-col shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)] px-6">
                    <div id="timers-wrapper" className="flex flex-row gap-8 py-6 max-[470px]:flex-col">
                        <TimerInput title="Pomodoro" minutes={pomodoroDuration} state={setPomodoroDuration}/>
                        <TimerInput title="Short break" minutes={shortBreakDuration} state={setShortBreakDuration}/>
                        <TimerInput title="Long break" minutes={longBreakDuration} state={setLongBreakDuration}/>
                    </div>

                    <div id="alert-volume-wrapper" className="flex flex-col gap-2 border-t-1 border-[#B1B4C9] py-6 pb-12">
                        <label htmlFor="volume-slider" className="font-fredoka text-[26px] font-medium text-[#464646] max-[470px]:text-[6.5vw]">
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
