const PomodoroButton = ({text,onClick}) => {
    return (
        <button
            onClick={onClick}
            className="
            w-[200px]
            h-[9vh]
            max-h-[50px]
            min-h-[20px]
            flex justify-center items-center p-2 text-center bg-white
            rounded-xl border-1 border-[#464646]
            font-fredoka text-[24px] text-[#464646]
            hover:bg-[#EAEAEA]
            active:bg-[#5F6379]
            active:text-white
            max-[616px]:text-[4vw]
            max-[616px]:px-1
            "
        >
            {text}
        </button>
    )
}

export default PomodoroButton
