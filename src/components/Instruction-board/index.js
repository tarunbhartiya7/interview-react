import React, { useEffect, useState } from "react";
import "./index.css";

export default function InstructionBoard() {
	const [instructions, setInstructions] = useState([])
	const [inputValue, setInputValue] = useState("")
	const [error, setError] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setError(false)
		}, 3000)
	}, [error])

	const addInstruction = (event) => {
		event.preventDefault()
		if(!inputValue) {
			setError(true)
		} else {
			instructions.push(inputValue)
			setInputValue("")
		}
	}

	const handleChange = (event) => {
		setInputValue(event.target.value)
	}

	const moveUp = (index) => {
		let temp = []
		for(let i=0;i<instructions.length;i++) {
			if(i === index - 1) {
				temp.push(instructions[index])
				temp.push(instructions[i])
				break
			}
			temp.push(instructions[i])
		}
		setInstructions([...temp, ...instructions.slice(index+1)])
	}

	const moveDown = (index) => {
		let temp = []
		for(let i=0;i<instructions.length;i++) {
			if(i === index) {
				temp.push(instructions[index + 1])
				temp.push(instructions[index])
				break
			}
			temp.push(instructions[i])
		}
		setInstructions([...temp, ...instructions.slice(index+2)])
	}

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center">
			<div>
				<form>
					<section
						className="my-30 layout-row align-items-center justify-content-center width-1000"
					>
						<input
							id="instruction-input"
							type="text"
							placeholder="New Instruction"
							data-testid="instruction-input"
							className="width-80"
							value={inputValue}
							onChange={handleChange}
						/>
						<button
							type="submit"
							className="ml-30 width-20"
							data-testid="add-instruction-button"
							onClick={addInstruction}
						>
							Add Instruction
						</button>
					</section>
					{
							error && 
							<p style={{color: "red"}}>Please enter an instruction.</p>
						}
				</form>
				<span data-testid="error-message" className="error hidden-span">{ }</span>
			</div>
			<div className="card outlined mt-0 width-800" >
				<div className="card-text" >
					<h4>Instructions</h4>
					<ul className="styled mt-50" data-testid="instructions">
						{
							instructions.map((item, index) => (
								<li key={index}>
									<div className="li-content layout-row justify-content-between align-items-center">
										<span>{index+1}</span>
										<span>{item}</span>
										<div className="icons">
											<button 
												disabled={instructions.length - 1 === index}
												className="icon-only x-medium mx-2" 
												onClick={() => moveDown(index)}
											>
												<i className="material-icons">arrow_drop_down_icon</i>
											</button>
											<button 
												disabled={index === 0}
												className="icon-only x-medium mx-2" 
												onClick={() => moveUp(index)}>
												<i className="material-icons">arrow_drop_up_icon</i>
											</button>
										</div>
									</div>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		</div>
	);
}
