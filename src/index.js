import app  from "./app.js"
import "./database.js"

const main = async () => {
    await app.listen(app.get("port"))
}

main()