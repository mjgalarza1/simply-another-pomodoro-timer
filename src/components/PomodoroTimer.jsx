import Play from "../assets/imgs/icons/play-svgrepo-com.svg"
import Pause from "../assets/imgs/icons/pause-svgrepo-com.svg"
import Restart from "../assets/imgs/icons/restart-svgrepo-com.svg"
import Settings from "../assets/imgs/icons/settings-svgrepo-com.svg"
import Info from "../assets/imgs/icons/icons8-info.svg"
import PlayerButton from "./buttons/PlayerButton.jsx";
import PomodoroButton from "./buttons/PomodoroButton.jsx";

function PomodoroTimer() {
    return (
        <div id="pomodoro-timer-container" className="flex flex-col gap-8 [@media(max-height:350px)]:gap-4">
            <div id="pomodoro-buttons-and-timer" className="text-center p-[24px] bg-white rounded-[25px] shadow-[15px_23px_50px_rgb(148,118,174)] flex flex-col justify-center w-[616px] max-[650px]:w-[95vw]">
                <div id="pomodoro-selection-buttons" className="flex flex-row justify-center gap-4.5 max-[616px]:gap-[2vw]">
                    <PomodoroButton text="Pomodoro" onClick={() => console.log("Pomodoro was pressed")} />
                    <PomodoroButton text="Short break" onClick={() => console.log("Short break was pressed")} />
                    <PomodoroButton text="Long break" onClick={() => console.log("Long break was pressed")} />
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

            <div id="pomodoro-player-buttons" className="flex flex-row justify-center gap-8 drop-shadow-[1px_3px_8px_rgba(94,44,164,0.71)]">
                <PlayerButton icon={Play} alt={"Play Button"} onClick={() => console.log("Play was pressed")} />
                <PlayerButton icon={Restart} alt={"Restart Button"} onClick={() => console.log("Restart was pressed")} />
                <PlayerButton icon={Settings} alt={"Settings Button"} onClick={() => console.log("Settings was pressed")} />
            </div>
        </div>
    )
}

export default PomodoroTimer
