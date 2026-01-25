import { useEffect } from "react"

const ArticlesPage = () => {

    useEffect(() => {
        document.title = "Щоденці | Статті"
    })
    return (
        <main>
            <h1>articles</h1>
        </main>
    )
}

export default ArticlesPage