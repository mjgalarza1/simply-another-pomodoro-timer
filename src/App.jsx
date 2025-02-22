import MainLogo from "./assets/imgs/simply-another-pomodoro-timer-logo.svg";
import GithubButton from "./components/buttons/GithubButton.jsx";
import PomodoroTimer from "./components/PomodoroTimer.jsx";

function App() {
    return (
        <>
            <div id="main-container" className="flex justify-center items-center h-screen min-h-[270px]">

                <div id="logo-and-pomodoro-timer-wrapper" className="flex flex-col justify-center items-center gap-3 w-[616px] animate-fadeAndZoomIn">

                    <div id="logo-wrapper" className="overflow-clip">
                        <img className="
                        w-[500px] px-4 [@media(max-height:750px)]:w-[66.5vh] [@media(max-height:350px)]:hidden
                        transition duration-300 ease-in-out hover:scale-105"
                            src={MainLogo} alt="Simply Another Pomodoro Timer"/>
                    </div>

                    <div id="pomodoro-timer-wrapper">
                        <PomodoroTimer/>
                    </div>

                </div>

                <div id="github-button-wrapper" className="fixed bottom-0 left-0">
                    <GithubButton/>
                </div>

            </div>
        </>
    )
}

export default App
