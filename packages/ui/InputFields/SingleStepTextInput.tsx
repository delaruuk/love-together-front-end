interface SingleStepTextInputProps {
	type: "email" | "password" | "text";
	name: string;
	placeholder?: string;
	defaultValue?: string;
	formValues: { [key: string]: any };
	isError?: boolean;
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const SingleStepTextInput = ({
	type,
	name,
	placeholder,
	defaultValue,
	formValues,
	isError,
	setFormValues,
}: SingleStepTextInputProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== "" || event.target.value !== undefined) {
			setFormValues({ ...formValues, [name]: event.target.value });
		}
	};
	return (
		<input
			className={`py-1 px-1 w-full outline-none bg-transparent border-b-2 focus:border-blue-600 ${
				isError ? "border-red-500" : "border-gray-500"
			} font-kumbh font-medium transition-colors ease-in-out duration-300 placeholder:text-gray-500 text-gray-500 autofill:text-gray-500`}
			type={type}
			name={name}
			placeholder={placeholder}
			defaultValue={defaultValue}
			autoComplete="off"
			onChange={(event) => handleChange(event)}
		/>
	);
};

export default SingleStepTextInput;
