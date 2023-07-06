import React from "react";
import SmallGrayText from "../Text/SmallGrayText";

type DateInputProps = {
	name: string;
	formValues: { [key: string]: any[] };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
	currentAnswers: string[];
};

const DateInput = ({
	name,
	formValues,
	setFormValues,
	currentAnswers,
}: DateInputProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues({ ...formValues, [name]: [event.target.value] });
	};

	return (
		<>
			<p className="pb-1 text-sm text-gray-500 font-light">
				Click the year at the <span className="uppercase font-bold">very</span>{" "}
				top to change it
			</p>
			<input
				className={`min-h-[2rem] py-1 px-1 w-full outline-none font-kumbh font-medium bg-transparent border-2 focus:border-blue-600 transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 autofill:text-gray-500 rounded-sm`}
				type="date"
				name={name}
				placeholder="mm/dd/yyyy"
				title="Pick your date of birth"
				min="1900-01-01"
				max="2100-01-01"
				onChange={(event) => handleChange(event)}
				defaultValue={currentAnswers}
			/>
		</>
	);
};

export default DateInput;
