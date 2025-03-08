import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Display from './components/Display'

const App = () => {
    const environment = import.meta.env.VITE_BUILD_ENV
    const [formData, setFormData] = useState({
        title: "",
        label: "",
        desc: ""
    })
    const [tasks, setTasks] = useState([])
    const called = useRef(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const urls = {
                development: 'http://localhost:500/api/tasks/add-task',
                production: 'https://mern-todoapp-api-kiflom.vercel.app/api/tasks/add-task'
            }
            const reqUrl = urls[environment];
            const response = await axios.post(reqUrl, formData)
            getTasks()
            setFormData({
                title: "",
                label: "",
                desc: ""
            })
            console.log("post request successful", response.data)
        } catch (error) {
            console.log("Error making post request: ", error)
        }
    }

    useEffect(() => {
        try {
            if (!called.current) {
                getTasks()
                called.current = true
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getTasks = async () => {
        const urls = {
            development: 'http://localhost:500/api/tasks/all',
            production: 'https://mern-todoapp-api-kiflom.vercel.app/api/tasks/all'
        }
        const reqUrl = urls[environment]
        const response = await axios.get(reqUrl)
        setTasks(response.data)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Task Manager</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter task title"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="label" className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="label"
                                    value={formData.label}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="important">Important</option>
                                    <option value="easy">Easy</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    placeholder="Enter task description"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add Task
                            </button>
                        </form>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <Display tasks={tasks} refresher={getTasks} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App