import MainLogo from "./assets/imgs/simply-another-pomodoro-timer-logo.svg";
import GithubButton from "./components/buttons/GithubButton.jsx";

function App() {
    return (
        <>
            <div id="main-container" className="flex flex-col justify-center items-center gap-1 h-screen w-screen">

                <img id="logo" className="w-lg" src={MainLogo} alt="Simply Another Pomodoro Timer"/>

                <div id="pomodoro-timer-container" className="text-center border-2">
                    <p>[ WIP: Pomodoro Timer container + bottom buttons ]</p>
                </div>

                <div id="github-link" className="fixed bottom-0 left-0">
                    <GithubButton />
                </div>
            </div>

        </>
    )
}

export default App
