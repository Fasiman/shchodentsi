import { useEffect } from "react"
import CreateArticleForm from "./components/CreateArticleForm/CreateArticleForm"

const CreateArticle = () => {

    useEffect(() => {
        document.title = "Щоденці | Створення історії"
    })
    return (
        <main>
             <CreateArticleForm />
        </main>
    )
}

export default CreateArticle