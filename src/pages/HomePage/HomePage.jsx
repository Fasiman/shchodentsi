import { useEffect } from "react"

import Hero from "./components/Hero/Hero"
import Why from "./components/Why/Why"
import Popular from "./components/Pupular/Pupular"
import Authors from "./components/Authors/Authors"
import Subscribe from "./components/Subscribe/Subscribe"

const HomePage = () => {

    useEffect(() => {
        document.title = "Щоденці | Головна"
    })
    return (
        <main>
             <Hero/>
             <Why/>
             <Popular/>
             <Authors/>
             <Subscribe/>
        </main>
    )
}

export default HomePage