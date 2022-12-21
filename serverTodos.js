import { createServer } from "node:http"
import { index, remove, update, write } from "./api/todos-foo.js"
import { NotFounfError } from "./api/errorClass.js"
import { createReadStream } from "node:fs"

const port = process.env.PORT || 3500

const todoServer = createServer(async function (req, res) {
	try {

		const url = new URL(req.url, `http://${req.headers.host}
		`)

		res.setHeader("Content-Type", "application/json")

		const endpoint = `${req.method}:${url.pathname}`
		// console.log(endpoint)
		let result
		switch (endpoint) {
			case "GET:/":
				res.setHeader("Content-Type", "text/html")
				console.log(endpoint)
				createReadStream("index.html").pipe(res)
				return
			case "GET:/todos":
				result = await index(req, res)
				break;
			case "POST:/todos":
				result = await write(req, res)
				break;
			case "DELETE:/todos":
				await remove(req, res, url)
			case "PATCH:/todos":
				await update(req, res, url)
				break;

			default:
				break;
		}

		if (result) {
			res.write(JSON.stringify(result))
		}

	} catch (err) {
		if (err instanceof NotFounfError) {
			res.statusCode = 404
			res.write("todo Not found")
			return
		}

		res.statusCode = 500
		throw err
	}
	fina
	res.end()

}
)

todoServer.listen(port, function () {
	console.log("todo server is running on port ",
		port)
})

