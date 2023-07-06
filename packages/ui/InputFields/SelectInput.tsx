type SelectInputProps = {
	name: string;
	selections: {
		value: string | number | boolean;
		selection: string | number;
	}[];
	formValues: { [key: string]: any };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
	currentAnswers: (number | string | boolean)[];
};

const SelectInput = ({
	name,
	selections,
	formValues,
	setFormValues,
	currentAnswers,
}: SelectInputProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	return (
		<select
			name={name}
			className="w-max text-sm text-end text-gray-500 font-medium font-mont"
			onChange={(event) => handleChange(event)}
			defaultValue={currentAnswers as string[]}
		>
			{selections?.map((selection, index) => (
				<option key={name + index} value={selection.value as string}>
					{selection.selection}
				</option>
			))}
		</select>
	);
};

export default SelectInput;
