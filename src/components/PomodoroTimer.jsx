import Play from "../assets/imgs/icons/play-svgrepo-com.svg"
import Pause from "../assets/imgs/icons/pause-svgrepo-com.svg"
import Restart from "../assets/imgs/icons/restart-svgrepo-com.svg"
import Settings from "../assets/imgs/icons/settings-svgrepo-com.svg"
import Info from "../assets/imgs/icons/icons8-info.svg"
import PlayerButton from "./buttons/PlayerButton.jsx";
import PomodoroRadioButton from "./buttons/PomodoroRadioButton.jsx";
import {useState} from "react";

function PomodoroTimer() {

    const [selectedDuration, setSelectedDuration] = useState("pomodoro")
    const [isPlaying, setIsPlaying] = useState(false)

    const handleDurationChange = (duration) => {
        console.log(duration + " was selected")
        setSelectedDuration(duration);
    };

    const handlePlay = () => {
        if (isPlaying) {
            console.log("Pause was pressed")
            setIsPlaying(false)
        } else {
            console.log("Play was pressed")
            setIsPlaying(true)
        }
    }

    return (
        <div id="pomodoro-timer-container" className="flex flex-col gap-8 [@media(max-height:350px)]:gap-4">
            <div id="pomodoro-buttons-and-timer" className="text-center p-[24px] bg-white rounded-[25px] shadow-[15px_23px_50px_rgb(148,118,174)] flex flex-col justify-center w-[616px] max-[650px]:w-[95vw]">

                <div id="pomodoro-selection-buttons" className="flex flex-row justify-between gap-3 max-[616px]:gap-[2vw]">
                    <PomodoroRadioButton inputValue="pomodoro" inputName="pomodoro" label="Pomodoro" isChecked={selectedDuration === "pomodoro"} onClick={() => handleDurationChange("pomodoro")}/>
                    <PomodoroRadioButton inputValue="short-break" inputName="pomodoro" label="Short break" isChecked={selectedDuration === "short-break"} onClick={() => handleDurationChange("short-break")}/>
                    <PomodoroRadioButton inputValue="long-break" inputName="pomodoro" label="Long break" isChecked={selectedDuration === "long-break"} onClick={() => handleDurationChange("long-break")}/>
                </div>
                <div id="timer">
                    <h1 className="font-fredoka text-[150px] text-[#464646] [@media(max-height:670px)]:text-[50px] max-[616px]:text-[24vw]">25:00</h1>
                </div>
                <div id="info-button" className="relative">
                    <button onClick={() => console.log("Info button was pressed")} className="absolute bottom-0 right-0 -mb-3 -mr-3 w-[24px] max-[376px]:w-[20px] hover:cursor-pointer">
                        <img src={Info} alt="Info button"/>
                    </button>
                </div>

            </div>


            {/* TODO: ADD behavior to everything, ADD Spotify playlist or Youtube radio*/}
            {/* FINISHED: Add player icons, add box-shadow to icons, make buttons component for the top buttons, add timer, add the info button, CHANGE buttons to radios?*/}

            <div id="pomodoro-player-buttons" className="flex flex-row justify-center gap-8 drop-shadow-[1px_3px_8px_rgba(94,44,164,0.71)]">
                {isPlaying ? <PlayerButton icon={Pause} alt={"Pause Button"} onClick={() => handlePlay()} /> : <PlayerButton icon={Play} alt={"Play Button"} onClick={() => handlePlay()} />}
                <PlayerButton icon={Restart} alt={"Restart Button"} onClick={() => console.log("Restart was pressed")} />
                <PlayerButton icon={Settings} alt={"Settings Button"} onClick={() => console.log("Settings was pressed")} />
            </div>
        </div>
    )
}

export default PomodoroTimer
