import { useState } from "react";

const App = () => {
	const [result, setResult] = useState("");
	

	const onSubmit = async (event) => {
		event.preventDefault();
		setResult("Sending....");
		const formData = new FormData(event.target);
    console.log(formData)

		formData.append("access_key", import.meta.env.VITE_ACCESS_KEY);

		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();

		if (data.success) {
			setResult("Form Submitted Successfully");
			event.target.reset();
		} else {
			console.log("Error", data);
			setResult(data.message);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-auto">
				<h1 className="text-2xl font-bold mb-4 text-center">Web3 Form</h1>
				<form onSubmit={onSubmit} className="space-y-4">
					<input
						placeholder="Your Name"
						type="text"
						name="name"
						required
						className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<input
						placeholder="Your Email"
						type="email"
						name="email"
						required
						className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<textarea
						placeholder="Your Message"
						name="message"
						required
						className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						rows="4"
					></textarea>

					<button
						className="w-full p-3 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
						type="submit"
					>
						Submit Form
					</button>
				</form>
				<span className="block mt-4 text-center text-gray-600">{result}</span>
			</div>
		</div>
	);
};

export default App;
