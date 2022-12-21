import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const todoPath = join("data", "todos.json")

/**
 * Todo type with jsdoc
 * @typedef {object} Todo
 * @property {string} title
 * @property {number} id
 * @property {boolean} complete
 */

/**
 * @return {Promise < Todo[]>} Array of Todo
 */
export async function getAllTodo() {
	return JSON.parse(await readFile(todoPath, { encoding: "utf-8" }))
}

export async function writeTodo(newTodo) {

	const data = await getAllTodo()
	const todos = JSON.stringify([...data, newTodo], null, 2)
	await writeFile(todoPath, todos, { encoding: "utf-8" })

	return newTodo
}

export async function deleteTodo(id) {

	let data = await getAllTodo()
	data = data.filter(todo => todo.id !== id)
	const todos = JSON.stringify(data, null, 2)

	return await writeFile(todoPath, todos, { encoding: "utf-8" })

}

export async function updateTodo(id, obj) {

	let data = await getAllTodo()

	data = data.map(todo => {
		if (todo.id == id) {
			return {
				...todo, ...obj
			}
		}
		else return todo
	})

	const todos = JSON.stringify(data, null, 2)

	return await writeFile(todoPath, todos, { encoding: "utf-8" })

}
