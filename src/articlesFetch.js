const articlesFetch = asyncThunkCreator () => {
    await fetch("http://localhost:1487/articles").then((data) => {
        console.log(data)
    })
}