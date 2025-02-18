const PlayerButton = ({icon,alt,onClick}) => {
    return (
        <button onClick={onClick} className="w-[48px] max-w-[8vw]">
            <img src={icon} alt={alt}/>
        </button>
    )
}

export default PlayerButton
