import Play from "../assets/imgs/icons/play-svgrepo-com.svg"
import Pause from "../assets/imgs/icons/pause-svgrepo-com.svg"
import Restart from "../assets/imgs/icons/restart-svgrepo-com.svg"
import Settings from "../assets/imgs/icons/settings-svgrepo-com.svg"
import Info from "../assets/imgs/icons/icons8-info.svg"
import PreAlarm from "../assets/sfx/pre-alarm-default.mp3"
import DefaultAlarm from "../assets/sfx/alarm-default.mp3"
import PlayerButton from "./buttons/PlayerButton.jsx";
import PomodoroRadioButton from "./buttons/PomodoroRadioButton.jsx";
import {useEffect, useRef, useState} from "react";

function PomodoroTimer() {

    const [selectedDuration, setSelectedDuration] = useState("pomodoro")
    const [isPlaying, setIsPlaying] = useState(false)

    const [pomodoroDuration, setPomodoroDuration] = useState(0.15)
    const [shortBreakDuration, setShortBreakDuration] = useState(0.1)
    const [longBreakDuration, setLongBreakDuration] = useState(0.1)

    const [currentDuration, setCurrentDuration] = useState(pomodoroDuration)

    const [sessionCounter, setSessionCounter] = useState(1)

    const [timeLeft, setTimeLeft] = useState(currentDuration * 60)
    const intervalRef = useRef(null)

    const preAlarmRef = useRef(new Audio(PreAlarm))
    const alarmRef = useRef(new Audio(DefaultAlarm))

    const pomodoroMap = new Map([
        ["pomodoro", "short-break"],
        ["short-break", "pomodoro"],
        ["long-break", "pomodoro"],
    ]);

    const durationMap = new Map([
        ["pomodoro", pomodoroDuration],
        ["short-break", shortBreakDuration],
        ["long-break", longBreakDuration],
    ]);

    // Transforms an amount of minutes to seconds.
    const getMinutesAsSeconds = (minutes) => {
        return (minutes * 60)
    }

    // Transitions between the three durations when the user starts the timer.
    const handleAutomaticDurationChange = () => {

        if (isPlaying) {
            if (sessionCounter < 7) {
                let nextDuration = pomodoroMap.get(selectedDuration)
                let timeDuration = durationMap.get(nextDuration)
                setCurrentDuration(timeDuration)
                setTimeLeft(getMinutesAsSeconds(timeDuration));
                console.log("Auto-changing from '" + selectedDuration + "' duration to: ", nextDuration)
                setSessionCounter(sessionCounter + 1);
                console.log("Current session:", nextDuration, sessionCounter + 1)
                setSelectedDuration(nextDuration)
            } else {
                setCurrentDuration(longBreakDuration)
                setTimeLeft(getMinutesAsSeconds(longBreakDuration));
                console.log("Auto-changing from '" + selectedDuration + "' duration to: long-break")
                setSessionCounter(0);
                console.log("Current session: long-break", sessionCounter + 1)
                setSelectedDuration("long-break")
            }
        }

    };

    // Manages the transition between the three durations when the user presses on them.
    const handleDurationChange = (duration) => {
        console.log(duration + " was selected by USER")
        switch (duration) {
            case "pomodoro":
                setSessionCounter(1)
                break;
            case "short-break":
                setSessionCounter(2)
                break;
            case "long-break":
                setSessionCounter(0)
        }
        let timeDuration = durationMap.get(duration)
        clearInterval(intervalRef.current)
        setSelectedDuration(duration)
        setCurrentDuration(timeDuration)
        setTimeLeft(getMinutesAsSeconds(timeDuration))
        setIsPlaying(false)
    };

    // Sets the isPlaying to true/false when the user presses the play/pause button.
    const handlePlay = () => {
        if (isPlaying) {
            console.log("Pause was pressed")
            setIsPlaying(false)
        } else {
            console.log("Play was pressed")
            setIsPlaying(true)
        }
    }

    // Restarts the timer when the user presses the restart button.
    const handleRestart = () => {
        console.log("Restart was pressed")
        setTimeLeft(getMinutesAsSeconds(currentDuration));
        setIsPlaying(false)
    }

    // REMOVE: This is here only to watch how timeLeft is behaving (with console logs).
    useEffect(() => {
        console.log(timeLeft)
    }, [timeLeft]);

    // Starts and pauses the timer using an interval.
    useEffect(() => {

        if (isPlaying && timeLeft === 0) {
            console.log("FIX: TimeLeft equals 0 and Play button has been pressed by user")
            handleAutomaticDurationChange()
            return;
        }
        if (isPlaying) {
            console.log("Starting interval with seconds: ", timeLeft)
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => Math.max(prev - 1, 0))
            }, 1000)
        } else {
            console.log("Interval has paused")
            clearInterval(intervalRef.current)
        }

        return () => clearInterval(intervalRef.current);

    }, [isPlaying, selectedDuration]);

    // Stops the timer when timeLeft reaches 0 and calls handleAutomaticDurationChange.
    useEffect(() => {
        if (timeLeft <= 0) {
            console.log("Time has stopped (reached 0s)")
            clearInterval(intervalRef.current)
            intervalRef.current = setInterval(() => {
                handleAutomaticDurationChange()
            }, 1000)
        }
    }, [timeLeft <= 0]);

    // Adds and syncs the timer to the webpage's title.
    useEffect(() => {
        document.title = formatTime(timeLeft) + " | Simply Another Pomodoro Timer"
    }, [timeLeft]);

    // Plays the pre-alarm sfx when timeLeft is below three, and the alarm when timeLeft equals zero.
    useEffect(() => {
        if (timeLeft > 0 && timeLeft <= 3) {
            console.log("Start preAlarm sfx")
            preAlarmRef.current.currentTime = 0;
            preAlarmRef.current.play().catch(error => console.error("An error has occurred trying to play audio:", error));
        }
        if (timeLeft === 0) {
            console.log("Start alarm sfx")
            alarmRef.current.currentTime = 0;
            alarmRef.current.play().catch(error => console.error("An error has occurred trying to play audio:", error));
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    };

    return (
        <div id="pomodoro-timer-container" className="flex flex-col gap-8 [@media(max-height:350px)]:gap-4">
            <div id="pomodoro-buttons-and-timer" className="text-center p-[24px] bg-white rounded-[25px] shadow-[15px_23px_50px_rgb(148,118,174)] flex flex-col justify-center w-[616px] max-[650px]:w-[95vw]">

                <div id="pomodoro-selection-buttons" className="flex flex-row justify-between gap-3 max-[616px]:gap-[2vw]">
                    <PomodoroRadioButton inputValue="pomodoro" inputName="pomodoro" label="Pomodoro" isChecked={selectedDuration === "pomodoro"} onClick={() => handleDurationChange("pomodoro")}/>
                    <PomodoroRadioButton inputValue="short-break" inputName="pomodoro" label="Short break" isChecked={selectedDuration === "short-break"} onClick={() => handleDurationChange("short-break")}/>
                    <PomodoroRadioButton inputValue="long-break" inputName="pomodoro" label="Long break" isChecked={selectedDuration === "long-break"} onClick={() => handleDurationChange("long-break")}/>
                </div>
                <div id="timer" className="font-rubik text-[150px] tabular-nums tracking-[-6px] text-[#464646] [@media(max-height:670px)]:text-[50px] [@media(max-height:670px)]:tracking-[-2px] max-[616px]:text-[24vw] max-[616px]:tracking-[-1vw]">
                    <div key={selectedDuration} className="animate-slideIn">
                        <h1 key={timeLeft} className={`${timeLeft <= 3 ? "animate-zoomOut" : ""}`}>{formatTime(timeLeft)}</h1>
                    </div>
                </div>
                <div id="info-button" className="relative">
                    <button onClick={() => console.log("Info button was pressed")} className="absolute bottom-0 right-0 -mb-3 -mr-3 w-[24px] max-[376px]:w-[20px] hover:cursor-pointer">
                        <img src={Info} alt="Info button"/>
                    </button>
                </div>

            </div>

            {/* TODO: ADD settings behavior (choose pomodoros+custom, alarm volume), ADD info behavior, REFACTOR names for clarity, ADD webpage icon*/}
            {/* TODO EXTRAS: ADD next button (+behaviour), ADD Spotify playlist or Youtube radio, MODULARIZE things better. SETTINGS: ability to DISABLE long-break and to CHOOSE alarm sfx*/}
            {/* FINISHED: Add player icons, add box-shadow to icons, make buttons component for the top buttons, add timer, add the info button, CHANGE buttons to radios? ADD startup animation (fade-in of main-container div, ADD timer behavior, ADD default alarm, ADD timer transition between durations)*/}
            {/* FINISHED FIX 1: When pausing at 00:00, timer doesn't continue if "play" is pressed again, and alarm keeps replaying.*/}
            {/* FINISHED FIX 2: When pausing and un-pausing, it restarts the interval timeout, un-syncing the alarm sfx.*/}

            <div id="pomodoro-player-buttons" className="flex flex-row justify-center gap-8 drop-shadow-[1px_3px_8px_rgba(94,44,164,0.71)]">
                {isPlaying ? <PlayerButton icon={Pause} alt={"Pause Button"} onClick={() => handlePlay()} /> : <PlayerButton icon={Play} alt={"Play Button"} onClick={() => handlePlay()} />}
                <PlayerButton icon={Restart} alt={"Restart Button"} onClick={() => handleRestart()} />
                <PlayerButton icon={Settings} alt={"Settings Button"} onClick={() => console.log("Settings was pressed")} />
            </div>
        </div>
    )
}

export default PomodoroTimer
