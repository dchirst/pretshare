

interface CounterProps {
    numPrets: number
}

const Counter = ({numPrets}: CounterProps) => {
    return (<div className={"m-3"}>
        You've had <strong>{numPrets}</strong> prets today
    </div>)
}

export default Counter