import { useEffect, useRef, MutableRefObject } from "react"

function usePrevious(value: string | number) {
    const ref: MutableRefObject<string | number> = useRef();
    useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    }, [value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
}

export default usePrevious;
