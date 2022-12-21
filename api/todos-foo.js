import { deleteTodo, getAllTodo, updateTodo, writeTodo } from "../functions/todos-storage.js";
import { json } from "node:stream/consumers"
import { NotFounfError } from "./errorClass.js"
/**
 *  a function to return all todo
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function index(req, res) {
	return getAllTodo()
}

export async function write(req, res) {
	const { title, complete } = await json(req)

	const newTodo = { title, complete, id: new Date().getMilliseconds() }

	console.log("data new : ", newTodo)
	return await writeTodo(newTodo)
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {string} url 
 */
export async function remove(req, res, url) {
	const id = parseInt(url.searchParams.get("id"), 10)

	const isPresent = (await index(req, res)).findIndex(todo => todo.id == id)
	// console.log("id : ", id)
	console.log("isPresent : ", isPresent)

	if (isPresent === -1) {
		throw new NotFounfError()
	} else {
		res.statusCode = 204
		return await deleteTodo(id)
	}
}

export async function update(req, res, url) {
	const id = parseInt(url.searchParams.get("id"), 10)
	const obj = await json(req)

	const isPresent = (await index(req, res)).findIndex(todo => todo.id == id)
	// console.log("isPresent : ", isPresent)

	if (isPresent === -1) {
		throw new NotFounfError()

	} else {
		res.statusCode = 204
		return await updateTodo(id, obj)
	}
}