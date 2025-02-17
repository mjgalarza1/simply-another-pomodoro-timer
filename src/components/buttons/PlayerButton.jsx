const PlayerButton = ({icon,alt,onClick}) => {
    return (
        <button onClick={onClick} className="w-[64px] max-w-[20vw] min-w-[32px]">
            <img src={icon} alt={alt} />
        </button>
    )
}

export default PlayerButton
