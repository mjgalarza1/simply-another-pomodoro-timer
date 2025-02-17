import MainLogo from "./assets/imgs/simply-another-pomodoro-timer-logo.svg";
import GithubButton from "./components/buttons/GithubButton.jsx";
import PomodoroTimer from "./components/buttons/PomodoroTimer.jsx";

function App() {
    return (
        <>
            <div id="main-container" className="flex flex-col justify-center items-center gap-1 h-screen w-screen">

                <img id="logo" className="w-lg" src={MainLogo} alt="Simply Another Pomodoro Timer"/>

                <div id="pomodoro-timer-container">
                    <PomodoroTimer />
                </div>

                <div id="github-link" className="fixed bottom-0 left-0">
                    <GithubButton />
                </div>
            </div>

        </>
    )
}

export default App
