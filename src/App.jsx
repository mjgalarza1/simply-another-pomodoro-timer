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

                <div id="github-link">
                    {/* This below could be its own component */}
                    <a
                        href="https://github.com/mjgalarza1/simply-another-pomodoro-timer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed bottom-0 left-0 bg-white p-1 rounded-tr-xl flex justify-between overflow-hidden group"
                    >

                        <div id="github-icon-container" className="w-6 flex items-center justify-center">
                            <img src={GithubIcon}/>
                        </div>

                        <div id="github-text-container"
                             className="-order-1 flex items-center justify-center whitespace-nowrap overflow-hidden w-0 transition-[width] duration-300 group-hover:w-[90px]">
                            <span className="font-gothic">mjgalarza1</span>
                        </div>

                    </a>
                </div>
            </div>

        </>
    )
}

export default App
