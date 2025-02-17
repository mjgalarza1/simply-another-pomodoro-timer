const PomodoroButton = ({text,onClick}) => {
    return (
        <button
            onClick={onClick}
            className="
            w-[256px]
            flex justify-center items-center p-2 text-center bg-white
            rounded-xl border-1 border-[#464646]
            font-fredoka text-[32px] text-[#464646]
            hover:bg-[#EAEAEA]
            active:bg-[#5F6379]
            active:text-white
            max-[816px]:text-[4vw]
            "
        >
            {text}
        </button>
    )
}

export default PomodoroButton
