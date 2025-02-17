import GithubIcon from "../../assets/imgs/Octicons-mark-github.svg";

function GithubButton() {
    return (
        <a
            href="https://github.com/mjgalarza1/simply-another-pomodoro-timer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-1 rounded-tr-xl flex justify-between overflow-hidden group"
        >

            <div id="github-icon-container" className="w-6 flex items-center justify-center">
                <img src={GithubIcon} alt="GithubIcon"/>
            </div>

            <div id="github-text-container"
                 className="-order-1 flex items-center justify-center whitespace-nowrap overflow-hidden w-0 transition-[width] duration-300 group-hover:w-[90px]">
                <span className="font-gothic">mjgalarza1</span>
            </div>

        </a>
    )
}

export default GithubButton
