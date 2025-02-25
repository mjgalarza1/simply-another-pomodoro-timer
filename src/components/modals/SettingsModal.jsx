import TimerInput from "../TimerInput.jsx";
import CloseButton from "../../assets/imgs/icons/close-svgrepo-com.svg";
import {useEffect, useState} from "react";

function SettingsModal({ close, pomodoroDuration, shortBreakDuration, longBreakDuration, alarmVolume, setPomodoroDuration, setShortBreakDuration, setLongBreakDuration, setAlarmVolume, handleSettingsTimerChange }) {

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
        volumeSlider.style.background = `linear-gradient(to right, #5F6379 ${alarmVolume * 100}%, #FFFFFF ${alarmVolume * 100}%)`;
    }, [alarmVolume]);

    // Disables body overflow when SettingsModal is open
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
            `fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-[35px] z-50 p-4
            ${isOpening ? "animate-settingsFadeIn" : ""}
            ${isClosing ? "animate-settingsFadeOut" : ""}
            `}>

            <div id="settings-container" className={
                `rounded-2xl bg-[#5F6379] shadow-[0_15px_20px_0_rgba(0,0,0,0.4)] my-6 max-[560px]:w-[95vw] max-h-full overflow-y-auto
                ${isOpening ? "animate-settingsSlideIn" : ""}
                ${isClosing ? "animate-settingsSlideOut" : ""}
                `}>

                <div id="title-wrapper" className="flex flex-row justify-between items-center py-5">
                    <h2 id="title" className="font-fredoka text-4xl tracking-[8px] text-white pl-8 truncate max-w-full max-[470px]:tracking-[1vw] max-[470px]:text-[18px]">SETTINGS</h2>
                    <div id="close-button" onClick={handleClosing} className="w-[26px] h-[26px] min-w-[26px] min-h-[26px] mr-5">
                        <button className="hover:cursor-pointer">
                            <img src={CloseButton} alt="X"/>
                        </button>
                    </div>
                </div>

                <div id="settings-wrapper"
                     className="flex flex-col shadow-[inset_0px_6px_14px_0px_rgba(95,99,121,0.15)] px-6 bg-white">
                    <div id="timers-wrapper" className="flex flex-row gap-8 py-6 max-[470px]:flex-col">
                        <TimerInput title="Pomodoro" minutes={pomodoroDuration} state={setPomodoroDuration} handler={handleSettingsTimerChange}/>
                        <TimerInput title="Short break" minutes={shortBreakDuration} state={setShortBreakDuration} handler={handleSettingsTimerChange}/>
                        <TimerInput title="Long break" minutes={longBreakDuration} state={setLongBreakDuration} handler={handleSettingsTimerChange}/>
                    </div>

                    <div id="alert-volume-wrapper" className="flex flex-col gap-2 border-t-1 border-[#B1B4C9] py-6 pb-12">
                        <label htmlFor="volume-slider" className="font-fredoka text-[26px] font-medium text-[#5F6379] max-[470px]:text-[6.5vw]">
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
                            className="w-full h-3 rounded-full border-1 border-[#5F6379] appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal
