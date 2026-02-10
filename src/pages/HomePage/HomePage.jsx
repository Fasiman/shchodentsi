import { useEffect } from "react"
import Container from "../../components/Container/Container"

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
            <Container>
                <Hero/>
                <Why/>
                <Popular/>
                <Authors/>
                <Subscribe/>
            </Container>
        </main>
    )
}

export default HomePage