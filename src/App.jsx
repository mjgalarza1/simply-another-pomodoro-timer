import MainLogo from "./assets/imgs/simply-another-pomodoro-timer-logo.svg";
import GithubButton from "./components/buttons/GithubButton.jsx";
import PomodoroTimer from "./components/PomodoroTimer.jsx";

function App() {
    return (
        <>
            <div id="wrapper" className="flex justify-center items-center h-screen">
                <div id="main-container" className="flex flex-col justify-center items-center gap-3 w-[616px] ">

                    <img id="logo" className="w-[500px] px-4 [@media(max-height:750px)]:w-[70vh]" src={MainLogo} alt="Simply Another Pomodoro Timer"/>

                    <div id="pomodoro-timer-container">
                        <PomodoroTimer/>
                    </div>

                    <div id="github-link" className="fixed bottom-0 left-0">
                        <GithubButton/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
