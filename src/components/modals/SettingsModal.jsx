import TimerInput from "../TimerInput.jsx";
import CloseButton from "../../assets/imgs/icons/close-svgrepo-com.svg";
import {useEffect, useState} from "react";
import ToggleButton from "../buttons/ToggleButton.jsx";

function SettingsModal({ close, timers, alarm, toggles }) {
    const {
        pomodoroDuration, setPomodoroDuration,
        shortBreakDuration, setShortBreakDuration,
        longBreakDuration, setLongBreakDuration,
        handleSettingsTimerChange
    } = timers;

    const {
        alarmVolume, setAlarmVolume
    } = alarm;

    const {
        isLongBreakEnabled, setIsLongBreakEnabled,
        isSkipButtonEnabled, setIsSkipButtonEnabled
    } = toggles;

    const [isOpening, setIsOpening] = useState(true)
    const [isClosing, setIsClosing] = useState(false)

    const handleVolume = (event) => {
        setAlarmVolume(event.target.value)
    }

    const handleClosing = () => {
        setIsClosing(true)
    }

    // Handles closing the modal when clicking outside of it
    const handleCloseOnClickOutside = (event) => {
        if (event.target.id === "settings-modal-container") {
            handleClosing();
        }
    };

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
        <div id="settings-modal-container" className={
            `fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-[35px] z-50 p-4
            ${isOpening ? "animate-settingsFadeIn" : ""}
            ${isClosing ? "animate-settingsFadeOut" : ""}`}
            onClick={handleCloseOnClickOutside}>

            <div id="settings-panel-container"
                 className={`flex flex-col gap-0 max-h-full max-[560px]:w-[95vw]
                    ${isOpening ? "animate-settingsSlideIn" : ""}
                    ${isClosing ? "animate-settingsSlideOut" : ""}
                `}>

                <div id="title-wrapper" className="flex flex-row justify-between items-center py-5 bg-[#5F6379] rounded-t-2xl">
                    <h2 id="title" className="font-fredoka text-4xl tracking-[8px] text-white pl-8 truncate max-w-full max-[470px]:tracking-[1vw] max-[470px]:text-[18px]">
                        SETTINGS
                    </h2>
                    <div id="close-button" onClick={handleClosing} className="w-[26px] h-[26px] min-w-[26px] min-h-[26px] mr-5">
                        <button className="hover:cursor-pointer">
                            <img src={CloseButton} alt="X"/>
                        </button>
                    </div>
                </div>

                <div id="settings-container"
                     className="rounded-b-2xl shadow-[0_15px_20px_0_rgba(0,0,0,0.4)] max-h-full overflow-y-auto">

                    <div id="settings-wrapper" className="flex flex-col bg-white">

                        <div className="bg-gray-200 h-8 pl-4 flex items-center"><p>Pomodoro</p></div>

                        <div id="timers-wrapper"
                             className="flex flex-row gap-8 p-6 pt-4 max-[470px]:flex-col max-[470px]:gap-1">
                            <TimerInput title="Pomodoro" minutes={pomodoroDuration} state={setPomodoroDuration}
                                        handler={handleSettingsTimerChange}/>
                            <TimerInput title="Short break" minutes={shortBreakDuration} state={setShortBreakDuration}
                                        handler={handleSettingsTimerChange}/>
                            <TimerInput title="Long break" minutes={longBreakDuration} state={setLongBreakDuration}
                                        handler={handleSettingsTimerChange} disabled={!isLongBreakEnabled}/>
                        </div>

                        <div className="bg-gray-200 h-8 pl-4 flex items-center"><p>Alarm</p></div>

                        <div id="alert-volume-wrapper" className="flex flex-col gap-2 p-6 pb-10">
                            <label htmlFor="volume-slider"
                                   className="font-fredoka text-[26px] font-medium text-[#5F6379] max-[470px]:text-[6.5vw]">
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

                        <div className="bg-gray-200 h-8 pl-4 flex items-center"><p>Advanced</p></div>

                        <div id="button-toggle-wrapper" className="flex flex-col px-6 pb-2">
                            <ToggleButton text="Long break" isChecked={isLongBreakEnabled} onChange={() => {
                                setIsLongBreakEnabled(!isLongBreakEnabled)
                                handleSettingsTimerChange()
                            }}/>
                            <ToggleButton text="Skip button" isChecked={isSkipButtonEnabled} onChange={() => {
                                setIsSkipButtonEnabled(!isSkipButtonEnabled)
                            }}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal
