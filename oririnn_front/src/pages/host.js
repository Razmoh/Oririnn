import Navbar from "../components/navbar_block";
import { useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";
import styles from '../styles/host.module.css';
import MiniCard from "../components/miniCard_block";

const initialState = {
    fetch: "",
    booking: "",
}

function reducer(state, action) {
    switch (action.type) {
        case "setOffer":
            state.fetch = action.fetchUser
            return {
                ...state,
                fetch: state.fetch,
            }
        case "bookings":
            if (action.payload.bookings[0] === undefined) {
                state.booking = ""
            }
            else {
                state.booking = action.payload.bookings
            }
            return { ...state, booking: state.booking, existingBooking: state.existingBooking }
        default:
            throw new Error("PROBLEM");
    }
}


function Host() {

    const token = localStorage.getItem("Token")

    let decoded;
    if (token !== undefined) {
        decoded = jwt_decode(token);
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        const fetchData = async () => {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token)
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            const response = await fetch(`http://localhost:8000/offer/owner?user_id=${decoded.id}`, requestOptions);
            const json = await response.json();
            if (json !== "No offer found") {
                dispatch({ type: "setOffer", fetchUser: json })
            }

        }

        fetchData()
            .catch(console.error);

    }, [decoded.id, token])

    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <div className={styles.cards}>
                    <h3>Mes offres</h3>
                    {state.fetch !== "" ?
                        <div className={styles.cardDetails} >
                            {state.fetch.map((value) =>
                                <span onClick={() => dispatch({ type: 'bookings', payload: value })}  key={value.id} >
                                    <MiniCard style={{'border': '1px solid black'}}
                                        title={value.title}
                                        city={value.city}
                                        date_start={value.dates_start}
                                        date_end={value.dates_end}
                                        id={value.id}
                                        
                                    />
                                </span>
                            )}
                        </div>
                        :
                        <div className={styles.cardDetails}>
                            <h4>Aucune offre cree</h4>
                        </div>

                    }
{/* onSelect={e => {style}} onBlur={e => setInputSelected(false)} */}
                </div>
                <div className={styles.bookings} >
                    <h3>Reservations</h3>
                    {state.booking !== "" ?
                        <div className={styles.bookingDetails}>
                            {state.booking.map((value) =>
                                <h4 key={value.id}>{value.dates_start} - {value.dates_end}</h4>
                            )}
                        </div>
                        :
                        <div className={styles.bookingDetails}>
                            <h4 className={styles.noRes}>Aucune</h4>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default Host