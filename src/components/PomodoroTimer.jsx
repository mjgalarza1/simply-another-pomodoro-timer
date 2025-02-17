import Play from "../assets/imgs/icons/play-svgrepo-com.svg"
import Pause from "../assets/imgs/icons/pause-svgrepo-com.svg"
import Restart from "../assets/imgs/icons/restart-svgrepo-com.svg"
import Settings from "../assets/imgs/icons/settings-svgrepo-com.svg"
import Info from "../assets/imgs/icons/icons8-info.svg"
import PlayerButton from "./buttons/PlayerButton.jsx";
import PomodoroButton from "./buttons/PomodoroButton.jsx";

function PomodoroTimer() {
    return (
        <div id="pomodoro-timer-container" className="flex flex-col gap-6">
            <div id="pomodoro-buttons-and-timer" className="text-center p-[25px] bg-white rounded-[25px] shadow-[15px_23px_50px_rgb(148,118,174)] flex flex-col justify-center w-[816px] max-[816px]:w-screen">
                <div id="pomodoro-selection-buttons" className="flex flex-row justify-center gap-4.5 max-[816px]:gap-[2vw]">
                    <PomodoroButton text="Pomodoro" onClick={() => console.log("Pomodoro was pressed")} />
                    <PomodoroButton text="Short break" onClick={() => console.log("Short break was pressed")} />
                    <PomodoroButton text="Long break" onClick={() => console.log("Long break was pressed")} />
                </div>
                <div id="timer">
                    <h1 className="font-fredoka text-[200px] text-[#464646] max-[816px]:text-[24vw]">25:00</h1>
                </div>
            </div>

            <div id="pomodoro-player-buttons" className="flex flex-row justify-center gap-6 drop-shadow-[1px_3px_8px_rgba(94,44,164,0.71)]">
                <PlayerButton icon={Play} alt={"Play Button"} onClick={() => console.log("Play was pressed")} />
                <PlayerButton icon={Restart} alt={"Restart Button"} onClick={() => console.log("Restart was pressed")} />
                <PlayerButton icon={Settings} alt={"Settings Button"} onClick={() => console.log("Settings was pressed")} />
            </div>
        </div>
    )
}

export default PomodoroTimer
