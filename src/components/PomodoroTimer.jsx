import Play from "../assets/imgs/icons/play-svgrepo-com.svg"
import Pause from "../assets/imgs/icons/pause-svgrepo-com.svg"
import Skip from "../assets/imgs/icons/skip-next-svgrepo-com.svg"
import Restart from "../assets/imgs/icons/restart-svgrepo-com.svg"
import Settings from "../assets/imgs/icons/settings-svgrepo-com.svg"
import Info from "../assets/imgs/icons/icons8-info.svg"
import PreAlarm from "../assets/sfx/pre-alarm-default.mp3"
import DefaultAlarm from "../assets/sfx/alarm-default.mp3"

import PlayerButton from "./buttons/PlayerButton.jsx";
import PomodoroRadioButton from "./buttons/PomodoroRadioButton.jsx";
import SettingsModal from "./modals/SettingsModal.jsx";
import InfoModal from "./modals/InfoModal.jsx";

import {useEffect, useRef, useState} from "react";

function PomodoroTimer() {

    const [selectedTimer, setSelectedTimer] = useState("pomodoro")
    const [isPlaying, setIsPlaying] = useState(false)
    const [isTimerAboutToChange, setIsTimerAboutToChange] = useState(false)

    const [pomodoroDuration, setPomodoroDuration] = useState(25)
    const [shortBreakDuration, setShortBreakDuration] = useState(5)
    const [longBreakDuration, setLongBreakDuration] = useState(10)

    const [currentTimer, setCurrentTimer] = useState(pomodoroDuration)

    const [sessionCounter, setSessionCounter] = useState(1)

    const [timeLeft, setTimeLeft] = useState(currentTimer * 60)
    const workerRef = useRef(null);

    const preAlarmRef = useRef(new Audio(PreAlarm))
    const alarmRef = useRef(new Audio(DefaultAlarm))
    const [alarmVolume, setAlarmVolume] = useState(1.0)

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [applyingConfiguration, setApplyingConfiguration] = useState(false)
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const [isLongBreakEnabled, setIsLongBreakEnabled] = useState(true)
    const [isSkipButtonEnabled, setIsSkipButtonEnabled] = useState(true)

    const pomodoroSequenceMap = new Map([
        ["pomodoro", "short-break"],
        ["short-break", "pomodoro"],
        ["long-break", "pomodoro"],
    ]);

    const timerMinutesMap = new Map([
        ["pomodoro", pomodoroDuration],
        ["short-break", shortBreakDuration],
        ["long-break", longBreakDuration],
    ]);

    // Transforms an amount of minutes to seconds.
    const getMinutesAsSeconds = (minutes) => {
        return (minutes * 60)
    }

    // Transitions between the three timers when the user starts the timer.
    const handleAutomaticTimerChange = () => {

        if (isPlaying) {

            if (sessionCounter < 7 || !isLongBreakEnabled) {
                let nextPomodoroSequence = pomodoroSequenceMap.get(selectedTimer)
                let timeDuration = timerMinutesMap.get(nextPomodoroSequence)
                setCurrentTimer(timeDuration)
                setTimeLeft(getMinutesAsSeconds(timeDuration));
                isLongBreakEnabled && setSessionCounter(sessionCounter + 1)
                setSelectedTimer(nextPomodoroSequence)
                workerRef.current.postMessage({ command: "start", duration: getMinutesAsSeconds(timeDuration) });
            } else {
                setCurrentTimer(longBreakDuration)
                setTimeLeft(getMinutesAsSeconds(longBreakDuration));
                setSessionCounter(0);
                setSelectedTimer("long-break")
                workerRef.current.postMessage({ command: "start", duration: getMinutesAsSeconds(longBreakDuration) });
            }
        }

    };

    // Manages the transition between the three timers when the user presses on them.
    const handleManualTimerChange = (pressedTimer) => {
        switch (pressedTimer) {
            case "pomodoro":
                setSessionCounter(1)
                break;
            case "short-break":
                setSessionCounter(2)
                break;
            case "long-break":
                setSessionCounter(0)
        }
        let timeDuration = timerMinutesMap.get(pressedTimer)
        setSelectedTimer(pressedTimer)
        setCurrentTimer(timeDuration)
        setTimeLeft(getMinutesAsSeconds(timeDuration))
        setIsPlaying(false)
        workerRef.current.postMessage({ command: "stop" });
    };

    // Sets the isPlaying to true/false when the user presses the play/pause button.
    const handlePlay = () => {
        if (isPlaying) {
            setIsPlaying(false)
            workerRef.current.postMessage({ command: "stop" });
        } else {
            setIsPlaying(true)
            workerRef.current.postMessage({ command: "start", duration: timeLeft });
        }
    }

    // Skips the current session to the next
    const handleSkip = () => {
        workerRef.current.postMessage({ command: "stop" });
        setIsTimerAboutToChange(true)
    }

    // Restarts the timer when the user presses the restart button.
    const handleRestart = () => {
        setTimeLeft(getMinutesAsSeconds(currentTimer));
        setIsPlaying(false)
        workerRef.current.postMessage({ command: "stop" });
        document.title = formatTime(getMinutesAsSeconds(currentTimer)) + " | Simply Another Pomodoro Timer"
    }

    // Opens the settings modal when the user presses the settings button.
    const handleSettings = () => {
        setSettingsOpen(true)
    }

    // Applies timers durations when changes are made in the settings.
    const handleSettingsTimerChange = () => {
        setApplyingConfiguration(true)
    }

    // Starts and pauses the timer using a Web Worker.
    useEffect(() => {
        if (!workerRef.current) {
            workerRef.current = new Worker(new URL("../utils/timerWorker.js", import.meta.url));
        }

        workerRef.current.onmessage = (e) => {
            setTimeLeft(e.data);
            document.title = formatTime(e.data) + " | Simply Another Pomodoro Timer"
            if (e.data < 1) {
                setIsTimerAboutToChange(true)
            }
        };
    }, []);

    // Makes the handleAutomaticTimerChange to trigger through a useEffect (it won't trigger it properly otherwise)
    useEffect(() => {
        if (isTimerAboutToChange) {
            handleAutomaticTimerChange()
            setIsTimerAboutToChange(false)
        }
    }, [isTimerAboutToChange]);

    // Adds and syncs the timer to the tab title when timer is playing/pausing or changing.
    useEffect(() => {
        document.title = formatTime(timeLeft) + " | Simply Another Pomodoro Timer"
    }, [selectedTimer, isPlaying]);

    // Plays the pre-alarm sfx when timeLeft is below three, and the alarm when timeLeft equals zero.
    useEffect(() => {
        if (timeLeft > 0 && timeLeft <= 3) {
            preAlarmRef.current.currentTime = 0;
            preAlarmRef.current.play().catch(error => console.error("An error has occurred trying to play audio:", error));
        }
        if (timeLeft === 0) {
            alarmRef.current.currentTime = 0;
            alarmRef.current.play().catch(error => console.error("An error has occurred trying to play audio:", error));
        }
    }, [timeLeft]);

    // Modifies the alarm's volume levels.
    useEffect(() => {
        if (alarmRef.current) {
            alarmRef.current.volume = alarmVolume;
        }
        if (preAlarmRef.current) {
            preAlarmRef.current.volume = alarmVolume;
        }
    }, [alarmVolume]);

    // Sets the changed timers (through settings)
    useEffect(() => {
        if (settingsOpen && selectedTimer === "pomodoro") {
            setCurrentTimer(pomodoroDuration)
        }
    }, [pomodoroDuration]);

    useEffect(() => {
        if (settingsOpen && selectedTimer === "short-break") {
            setCurrentTimer(shortBreakDuration)
        }
    }, [shortBreakDuration]);

    useEffect(() => {
        if (settingsOpen && selectedTimer === "long-break") {
            setCurrentTimer(longBreakDuration)
        }
    }, [longBreakDuration]);

    // Applies the configuration after the settings modal is closed
    useEffect(() => {
        if (applyingConfiguration) {
            handleManualTimerChange(selectedTimer)
            setApplyingConfiguration(false)

            if (selectedTimer === "long-break" && !isLongBreakEnabled) {
                handleManualTimerChange("pomodoro")
            }
        }
    }, [settingsOpen]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    };

    return (
        <div id="pomodoro-timer-container" className="flex flex-col gap-8 [@media(max-height:350px)]:gap-4">

            {settingsOpen && (
                <SettingsModal
                    close={() => setSettingsOpen(false)}
                    pomodoroDuration={pomodoroDuration}
                    shortBreakDuration={shortBreakDuration}
                    longBreakDuration={longBreakDuration}
                    alarmVolume={alarmVolume}
                    setPomodoroDuration={setPomodoroDuration}
                    setShortBreakDuration={setShortBreakDuration}
                    setLongBreakDuration={setLongBreakDuration}
                    setAlarmVolume={setAlarmVolume}
                    handleSettingsTimerChange={handleSettingsTimerChange}
                    isLongBreakEnabled={isLongBreakEnabled}
                    setIsLongBreakEnabled={setIsLongBreakEnabled}
                    isSkipButtonEnabled={isSkipButtonEnabled}
                    setIsSkipButtonEnabled={setIsSkipButtonEnabled}
                />
            )}

            {isInfoOpen &&
                <InfoModal close={() => setIsInfoOpen(false)}/>
            }

            <div id="pomodoro-buttons-and-timer" className="text-center p-[24px] bg-white rounded-[25px] shadow-[15px_23px_50px_rgb(148,118,174)] flex flex-col justify-center w-[616px] max-[650px]:w-[95vw]">

                <div id="pomodoro-selection-buttons" className="flex flex-row justify-evenly gap-3 max-[616px]:gap-[2vw]">
                    <PomodoroRadioButton inputValue="pomodoro" inputName="pomodoro" label="Pomodoro" isChecked={selectedTimer === "pomodoro"} onClick={() => handleManualTimerChange("pomodoro")}/>
                    <PomodoroRadioButton inputValue="short-break" inputName="pomodoro" label="Short break" isChecked={selectedTimer === "short-break"} onClick={() => handleManualTimerChange("short-break")}/>
                    {isLongBreakEnabled && <PomodoroRadioButton inputValue="long-break" inputName="pomodoro" label="Long break" isChecked={selectedTimer === "long-break"} onClick={() => handleManualTimerChange("long-break")}/>}
                </div>
                <div id="timer" className="font-rubik text-[150px] tabular-nums tracking-[-6px] text-[#464646] [@media(max-height:670px)]:text-[50px] [@media(max-height:670px)]:tracking-[-2px] max-[616px]:text-[24vw] max-[616px]:tracking-[-1vw]">
                    <div key={selectedTimer} className="animate-slideIn">
                        <h1 key={timeLeft} className={`${timeLeft <= 3 && timeLeft > 0 ? "animate-zoomOut" : ""}`}>{formatTime(Math.max(timeLeft, 1))}</h1>
                    </div>
                </div>
                <div id="info-button" className="relative">
                    <button onClick={() => setIsInfoOpen(true)} className="absolute bottom-0 right-0 -mb-3 -mr-3 w-[24px] max-[376px]:w-[20px] hover:cursor-pointer">
                        <img src={Info} alt="Info button"/>
                    </button>
                </div>

            </div>

            <div id="pomodoro-player-buttons" className="flex flex-row justify-center gap-8 drop-shadow-[1px_3px_8px_rgba(94,44,164,0.71)]">
                {isPlaying ? <PlayerButton icon={Pause} alt={"Pause Button"} onClick={() => handlePlay()} /> : <PlayerButton icon={Play} alt={"Play Button"} onClick={() => handlePlay()} />}
                {isSkipButtonEnabled && isPlaying && <PlayerButton icon={Skip} alt={"Skip Button"} onClick={() => handleSkip()} />}
                <PlayerButton icon={Restart} alt={"Restart Button"} onClick={() => handleRestart()} />
                <PlayerButton icon={Settings} alt={"Settings Button"} onClick={() => handleSettings()} />
            </div>
        </div>
    )
}

export default PomodoroTimer
