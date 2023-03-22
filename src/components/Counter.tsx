

interface CounterProps {
    numPrets: number
}

const Counter = ({numPrets}: CounterProps) => {
    return <div>You've had {numPrets} prets today</div>
}

export default Counter