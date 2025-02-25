import {useEffect, useState} from "react";

function InfoModal({close}) {

    const [isOpening, setIsOpening] = useState(true);
    const [isClosing, setIsClosing] = useState(false)

    // Disables body overflow when InfoModal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Waits for fadeOut and slideOut transitions to finish before closing
    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                close()
                setIsOpening(false)
            }, 150);
        }
    }, [isClosing]);

    return (
        <div className={
            `fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-md z-50 p-4
            ${isOpening ? "animate-settingsFadeIn" : ""}
            ${isClosing ? "animate-settingsFadeOut" : ""}
            `}>

            <div className={
                    `bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg overflow-y-auto max-h-[80vh]
                    ${isOpening ? "animate-settingsSlideIn" : ""}
                    ${isClosing ? "animate-settingsSlideOut" : ""}
                `}>
                <h2 className="text-2xl font-bold text-gray-800">What is the Pomodoro Technique?</h2>
                <p className="text-gray-600 mt-2">
                    The Pomodoro method is a time management technique that divides work into 25-minute intervals,
                    followed by short breaks, in order to help you stay productive.
                    After every four Pomodoros, you can take a longer break.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-4">How to use it?</h2>
                <ol className="list-decimal ml-5 text-gray-600 mt-2">
                    <li>Set the Pomodoro duration in the settings.</li>
                    <li>Press the Start button to begin.</li>
                    <li>Work until the alarm goes off.</li>
                    <li>Take a break and repeat the process.</li>
                </ol>

                <h2 className="text-2xl font-bold text-gray-800 mt-4">Credits</h2>
                <p className="text-gray-600 mt-2 text-xs list-disc">
                    <li>
                        <a className="text-sky-500"
                           href="https://wallpapers.com/wallpapers/pastel-watercolor-q4u3pgnrn42zo6zb.html"
                           target="_blank">Wallpaper by swagmister</a> on Wallpapers.com
                    </li>
                    <li>
                        <a className="text-sky-500" target="_blank"
                           href="https://icons8.com/icon/lr0VUxUGGB6L/info">Info</a> icon by
                        <a target="_blank" href="https://icons8.com" className="text-sky-500"> Icons8</a>
                    </li>
                    <li>
                        Play, pause, restart, and settings buttons: <br/>
                        <span className="ml-4">
                            Vectors and icons by <a className="text-sky-500"
                            href="https://www.figma.com/community/file/1166831539721848736?ref=svgrepo.com"
                            target="_blank">Solar Icons</a> in CC Attribution License via
                            <a href="https://www.svgrepo.com/" target="_blank" className="text-sky-500"> SVG Repo</a>
                        </span>
                    </li>
                    <li>
                        Settings Close Button: <br/>
                        <span className="ml-4">
                            Vectors and icons by <a className="text-sky-500"
                            href="https://www.figma.com/@d12da0b9_b193_4?ref=svgrepo.com"
                            target="_blank">Giovana</a> in CC Attribution License via
                            <a href="https://www.svgrepo.com/" target="_blank" className="text-sky-500"> SVG Repo</a>
                        </span>
                    </li>

                </p>

                <p className="text-gray-600 mt-2 text-xs">
                    This web app was inspired by the <a href="https://www.pomodorotechnique.com" target="_blank" className="text-sky-500">technique</a> developed by <a href="https://www.francescocirillo.com" target="_blank" className="text-sky-500">Francesco Cirillo</a>.
                </p>

                <button onClick={() => setIsClosing(true)}
                        className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 w-full">
                    Close
                </button>
            </div>
        </div>
    );
}

export default InfoModal
