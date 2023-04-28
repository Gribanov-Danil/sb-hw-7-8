import {hot} from "react-hot-loader/root"
import "./app.css"
import {useEffect, useRef, useState} from "react"
import {CardVendor} from "../components/cardVendor/card-vendor"
import {cardDict} from "../utils/constants/cardDict"

export const App = () => {
    const cardRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const cvcRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const [state, setState] = useState({
        card: "",
        date: "",
        cvc: "",
        email: "",
        cardCheck: false,
        dateCheck: false,
        cvcCheck: false,
        emailCheck: false,
    })

    useEffect(() => {
        if (state.cardCheck && state.dateCheck && state.cvcCheck && state.emailCheck) {
            if (buttonRef.current) {
                buttonRef.current.style.background = "white"
                buttonRef.current.style.cursor = "pointer"
            }
        }
    }, [state.cardCheck, state.dateCheck, state.cvcCheck, state.emailCheck])

    return (
        <div className="App">
            <form className="form">
                <CardVendor card={ state.card} cardDict={cardDict} />
                <div>
                    <input
                        placeholder="Card number"
                        type="number"
                        value={state.card}
                        onChange={(e) => {
                            const { value } = e.target
                            if (value.length <= 19) {
                                setState({...state, card: e.target.value})
                            }}}
                        ref={cardRef}
                        maxLength={19}
                        onBlur={() => {
                            if (cardRef.current){
                                if ( state.card.length < 13 || state.card.length > 19) {
                                    cardRef.current.style.borderColor = "red"
                                    setState({...state, cardCheck: false})
                                } else {
                                    cardRef.current.style.borderColor = "black"
                                    setState({...state, cardCheck: true})
                                }
                            }
                        }}
                    />
                </div>
                <div>
                    <input
                        placeholder="MM/YY"
                        type="text"
                        value={state.date}
                        onChange={(e) => {
                            const { value } = e.target
                            if (value.length === 2) {
                                setState({...state, date: `${value}/`})
                            } else if (value.length <= 5) {
                                setState({...state, date: value})
                            }
                        }}
                        onBlur={() => {
                            if (dateRef.current) {
                                if (state.card.length < 5) {
                                    dateRef.current.style.borderColor = "red"
                                    setState({...state, dateCheck: false})
                                } else {
                                    dateRef.current.style.borderColor = "black"
                                    setState({...state, cardCheck: true})
                                }
                            }
                        }}
                        ref={dateRef}
                    />

                </div>
                <div>
                    <input
                        placeholder="CVC"
                        type="number"
                        value={state.cvc}
                        maxLength={3}
                        ref={cvcRef}
                        onChange={(e) => {
                            const { value } = e.target
                            if (value.length <= 3) {
                                setState({...state, cvc: value})
                            }
                        }}
                        onBlur={() => {
                            if (cvcRef.current) {
                                if (state.cvc.length < 3) {
                                    cvcRef.current.style.borderColor = "red"
                                    setState({...state, cvcCheck: false})
                                } else {
                                    cvcRef.current.style.borderColor = "black"
                                    setState({...state, cvcCheck: true})
                                }
                            }

                        }}
                    />
                </div>
                <div>
                    <input
                        placeholder="Email"
                        type="email"
                        value={state.email}
                        onChange={(event) => setState({...state, email: event.target.value})}
                        onBlur={() => {
                            if (emailRef.current) {
                                if (state.email.length === 0 || state.email.indexOf("@") === -1 || state.email.indexOf(".") === -1) {
                                    emailRef.current.style.borderColor = "red"
                                    setState({...state, emailCheck: false})
                                } else {
                                    emailRef.current.style.borderColor = "black"
                                    setState({...state, emailCheck: true})
                                }
                            }
                        }}
                        ref={emailRef}
                    />
                </div>
                <div>
                    <button
                        className={"button"}
                        type={"submit"}
                        ref={buttonRef}
                    >
                        submit
                    </button>
                </div>
            </form>
        </div>
    )
}


export default hot(App)