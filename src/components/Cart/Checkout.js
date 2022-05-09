import { useRef, useState } from 'react'
import './Checkout.css'

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })

    const nameInput = useRef()
    const streetInput = useRef()
    const postalInput = useRef()
    const cityInput = useRef()

    const confirmHandler = (e) => {
        e.preventDefault()
        const enteredName = nameInput.current.value
        const enteredStreet = streetInput.current.value
        const enteredPostal = postalInput.current.value
        const enteredCity = cityInput.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = isFiveChars(enteredPostal)
        const enteredCityIsValid = !isEmpty(enteredCity)

        setFormValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid 

        if(!formIsValid) {
            return

        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        })
    }

    

  return (
    <form onSubmit={confirmHandler}>
        <div className={`control ${formValidity.name ? '' : 'invalid' }`}>
            <label htmlFor="name">Your name</label>
            <input type="text" id='name' ref={nameInput}/>
            {!formValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={`control ${formValidity.street ? '' : 'invalid' }`}>
            <label htmlFor="street">Street</label>
            <input type="text" id='street' ref={streetInput} />
            {!formValidity.street && <p>Please enter a valid street</p>}
        </div>
        <div className={`control ${formValidity.postal ? '' : 'invalid' }`}>
            <label htmlFor="postal">Postal</label>
            <input type="text" id='postal' ref={postalInput}/>
            {!formValidity.postal && <p>Please enter a valid Postal Code</p>}
        </div>
        <div className={`control ${formValidity.city ? '' : 'invalid' }`}>
            <label htmlFor="city">City</label>
            <input type="text" id='city' ref={cityInput}/>
            {!formValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className='actions'>
        <button type='button' onClick={props.onClick} >Cancel</button>
        <button >Confirm</button>
        </div>
    </form>

  )
}

export default Checkout