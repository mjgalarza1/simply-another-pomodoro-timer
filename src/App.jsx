import MainLogo from "./assets/imgs/simply-another-pomodoro-timer-logo.svg";
import GithubIcon from "./assets/imgs/Octicons-mark-github.svg";

function App() {
    return (
        <>
            <div id="main-container" className="flex flex-col justify-center items-center gap-1 h-screen w-screen">

                <img id="logo" className="w-lg" src={MainLogo} alt="Simply Another Pomodoro Timer"/>

                <div id="pomodoro-timer-container" className="text-center border-2">
                    <p>[ WIP: Pomodoro Timer container + bottom buttons ]</p>
                </div>

                <a
                    id="github-link"
                    href="https://github.com/mjgalarza1/simply-another-pomodoro-timer"
                    target="_blank"
                    className="fixed p-2 bottom-0 left-0 rounded-tr-xl bg-white flex gap-2">
                    <img src={GithubIcon} className="w-6"/>
                    <p>mjgalarza1</p>
                </a>

            </div>

        </>
    )
}

export default App
