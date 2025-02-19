const PlayerButton = ({icon,alt,onClick}) => {
    return (
        <button onClick={onClick} className="
            w-[48px] max-w-[8vw]
            transition duration-100 ease-in-out
            hover:scale-120
            active:scale-80
            hover:cursor-pointer
        ">
            <img src={icon} alt={alt}/>
        </button>
    )
}

export default PlayerButton
