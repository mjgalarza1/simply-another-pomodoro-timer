import MainLogo from "./assets/imgs/simply-another-pomodoro-timer-logo.svg";
import GithubButton from "./components/buttons/GithubButton.jsx";
import PomodoroTimer from "./components/PomodoroTimer.jsx";
import {useState} from "react";

function App() {

    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false)

    return (
        <>
            <div id="main-container" className={`
                flex justify-center items-center h-screen min-h-[270px] h-full font-bold
                bg-[url('/pastel-background.jpg')] bg-cover
                dark:bg-[url('/night-starry-sky-background-freepik.jpg')]
                dark:bg-bottom dark:bg-center
                ${isDarkModeEnabled ? "dark" : ""}
                `}>

                <div id="logo-and-pomodoro-timer-wrapper" className="flex flex-col justify-center items-center gap-3 w-[616px] animate-fadeAndZoomIn">

                    <div id="logo-wrapper" className="overflow-clip">
                        <img className="
                        w-[500px] px-4 [@media(max-height:750px)]:w-[66.5vh] [@media(max-height:350px)]:hidden
                        transition duration-300 ease-in-out hover:scale-105"
                            src={MainLogo} alt="Simply Another Pomodoro Timer"/>
                    </div>

                    <div id="pomodoro-timer-wrapper">
                        <PomodoroTimer isDarkModeEnabled={isDarkModeEnabled} setIsDarkModeEnabled={setIsDarkModeEnabled}/>
                    </div>

                </div>

                <div id="github-button-wrapper" className="fixed bottom-2 left-2 [@media(max-height:300px)]:hidden">
                    <GithubButton/>
                </div>

            </div>
        </>
    )
}

export default App
