

interface LastPretProps {
    lastPret: Date | undefined
    reachedLimit: boolean

}

export const LastPret = ({lastPret, reachedLimit}: LastPretProps) => {
    let message;
    if (lastPret === undefined) {
        message = "Time for your first Pret!"
    } else if (reachedLimit) {
        message = "You're out of Prets for today. Come back tomorrow!"
    } else {
        message = `Your last Pret was at ${lastPret.toLocaleString("en-gb")}`
    }

    return (
        <div>
            <p className={"text-slate-400"}>{message}</p>
        </div>
    )
}