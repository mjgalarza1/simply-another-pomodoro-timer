import Play from "../assets/imgs/icons/play-svgrepo-com.svg"
import Pause from "../assets/imgs/icons/pause-svgrepo-com.svg"
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

    const [pomodoroDuration, setPomodoroDuration] = useState(25)
    const [shortBreakDuration, setShortBreakDuration] = useState(5)
    const [longBreakDuration, setLongBreakDuration] = useState(10)

    const [currentTimer, setCurrentTimer] = useState(pomodoroDuration)

    const [sessionCounter, setSessionCounter] = useState(1)

    const [timeLeft, setTimeLeft] = useState(currentTimer * 60)
    const intervalRef = useRef(null)

    const preAlarmRef = useRef(new Audio(PreAlarm))
    const alarmRef = useRef(new Audio(DefaultAlarm))
    const [alarmVolume, setAlarmVolume] = useState(1.0)

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [applyingConfiguration, setApplyingConfiguration] = useState(false)
    const [isInfoOpen, setIsInfoOpen] = useState(false);

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
            if (sessionCounter < 7) {
                let nextPomodoroSequence = pomodoroSequenceMap.get(selectedTimer)
                let timeDuration = timerMinutesMap.get(nextPomodoroSequence)
                setCurrentTimer(timeDuration)
                setTimeLeft(getMinutesAsSeconds(timeDuration));
                setSessionCounter(sessionCounter + 1);
                setSelectedTimer(nextPomodoroSequence)
            } else {
                setCurrentTimer(longBreakDuration)
                setTimeLeft(getMinutesAsSeconds(longBreakDuration));
                setSessionCounter(0);
                setSelectedTimer("long-break")
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
        clearInterval(intervalRef.current)
        setSelectedTimer(pressedTimer)
        setCurrentTimer(timeDuration)
        setTimeLeft(getMinutesAsSeconds(timeDuration))
        setIsPlaying(false)
    };

    // Sets the isPlaying to true/false when the user presses the play/pause button.
    const handlePlay = () => {
        if (isPlaying) {
            setIsPlaying(false)
        } else {
            setIsPlaying(true)
        }
    }

    // Restarts the timer when the user presses the restart button.
    const handleRestart = () => {
        setTimeLeft(getMinutesAsSeconds(currentTimer));
        setIsPlaying(false)
    }

    // Opens the settings modal when the user presses the settings button
    const handleSettings = () => {
        setSettingsOpen(true)
    }

    const handleSettingsTimerChange = () => {
        setApplyingConfiguration(true)
    }

    // Starts and pauses the timer using an interval.
    useEffect(() => {
        if (isPlaying && timeLeft === 0) {
            handleAutomaticTimerChange()
            return;
        }

        if (isPlaying) {
            const startTime = Date.now()
            const targetTime = startTime + timeLeft * 1000

            intervalRef.current = setInterval(() => {
                const now = Date.now()
                const remaining = Math.max(Math.round((targetTime - now) / 1000), 0)
                setTimeLeft(remaining)
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, selectedTimer]);

    // Stops the timer when timeLeft reaches 0 and calls handleAutomaticTimerChange.
    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalRef.current)

            const startTime = Date.now();

            const timeoutId = setTimeout(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                if (elapsed >= 1) {
                    handleAutomaticTimerChange();
                }
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [timeLeft <= 0]);

    // Adds and syncs the timer to the tab title.
    useEffect(() => {
        document.title = formatTime(timeLeft) + " | Simply Another Pomodoro Timer"
    }, [timeLeft]);

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

    useEffect(() => {
        if (applyingConfiguration) {
            setTimeLeft(getMinutesAsSeconds(currentTimer));
            setIsPlaying(false)
            setApplyingConfiguration(false)
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
                />
            )}

            {isInfoOpen &&
                <InfoModal close={() => setIsInfoOpen(false)}/>
            }

            <div id="pomodoro-buttons-and-timer" className="text-center p-[24px] bg-white rounded-[25px] shadow-[15px_23px_50px_rgb(148,118,174)] flex flex-col justify-center w-[616px] max-[650px]:w-[95vw]">

                <div id="pomodoro-selection-buttons" className="flex flex-row justify-between gap-3 max-[616px]:gap-[2vw]">
                    <PomodoroRadioButton inputValue="pomodoro" inputName="pomodoro" label="Pomodoro" isChecked={selectedTimer === "pomodoro"} onClick={() => handleManualTimerChange("pomodoro")}/>
                    <PomodoroRadioButton inputValue="short-break" inputName="pomodoro" label="Short break" isChecked={selectedTimer === "short-break"} onClick={() => handleManualTimerChange("short-break")}/>
                    <PomodoroRadioButton inputValue="long-break" inputName="pomodoro" label="Long break" isChecked={selectedTimer === "long-break"} onClick={() => handleManualTimerChange("long-break")}/>
                </div>
                <div id="timer" className="font-rubik text-[150px] tabular-nums tracking-[-6px] text-[#464646] [@media(max-height:670px)]:text-[50px] [@media(max-height:670px)]:tracking-[-2px] max-[616px]:text-[24vw] max-[616px]:tracking-[-1vw]">
                    <div key={selectedTimer} className="animate-slideIn">
                        <h1 key={timeLeft} className={`${timeLeft <= 3 ? "animate-zoomOut" : ""}`}>{formatTime(timeLeft)}</h1>
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
                <PlayerButton icon={Restart} alt={"Restart Button"} onClick={() => handleRestart()} />
                <PlayerButton icon={Settings} alt={"Settings Button"} onClick={() => handleSettings()} />
            </div>
        </div>
    )
}

export default PomodoroTimer
