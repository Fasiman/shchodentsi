import { useEffect } from "react"

import Hero from "./components/Hero/Hero"
import Why from "./components/Why/Why"
import Popular from "./components/Pupular/Pupular"

const HomePage = () => {

    useEffect(() => {
        document.title = "Щоденці | Головна"
    })
    return (
        <main>
             <Hero/>
             <Why/>
             <Popular/>
        </main>
    )
}

export default HomePage