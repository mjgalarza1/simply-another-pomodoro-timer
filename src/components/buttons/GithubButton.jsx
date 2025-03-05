import GithubIcon from "../../assets/imgs/Octicons-mark-github.svg";

function GithubButton() {
    return (
        <a
            href="https://github.com/mjgalarza1/simply-another-pomodoro-timer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-0.5 rounded-full flex justify-between overflow-hidden group"
        >

            <div id="github-icon-container" className="w-5.5 flex items-center justify-center max-[400px]:w-4.5">
                <img src={GithubIcon} alt="GithubIcon"/>
            </div>

            <div id="github-text-container"
                 className="order-1 flex items-center justify-center whitespace-nowrap overflow-hidden w-0
                    transition-[width] duration-300 group-hover:w-[80px] max-[400px]:group-hover:w-[68px]">
                <span className="font-gothic text-sm max-[400px]:text-[12px]">mjgalarza1</span>
            </div>

        </a>
    )
}

export default GithubButton
