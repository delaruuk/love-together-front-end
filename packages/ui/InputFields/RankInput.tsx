import { createRef, useEffect, useRef, useState } from "react";
import {
	SurveyQuestion,
	SurveyQuestionAnswerAlternate,
	UserQuestion,
} from "models";
import SmallGrayText from "../Text/SmallGrayText";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "react-beautiful-dnd";

interface RankInputProps {
	question: SurveyQuestion | UserQuestion;
	formValues: { [key: string]: any[] };
	setFormValues: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
	currentAnswers: string[];
}

const RankInput = ({
	question,
	formValues,
	setFormValues,
	currentAnswers,
}: RankInputProps) => {
	const [selections, setSelections] = useState<string[]>(
		question.answers as string[]
	);

	const handleDragEnd = (result: DropResult) => {
		const tempSelections = [...selections];
		const [reorderd] = tempSelections.splice(result.source.index, 1);
		tempSelections.splice(result?.destination?.index as number, 0, reorderd);
		setSelections(tempSelections);
		setFormValues({
			...formValues,
			[question._id]: tempSelections,
		});
	};

	useEffect(() => {
		if (currentAnswers) {
			setSelections(currentAnswers);
		}
	}, [currentAnswers]);

	return (
		<div className="max-w-max">
			<DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
				<Droppable droppableId="selections">
					{(provided, snapshot) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{selections?.map((answer, index) => (
								<Draggable
									key={`${index}${answer}`}
									draggableId={`selection-${index}`}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											className={`my-2 ${
												snapshot.isDragging ? "bg-gray-400" : "bg-gray-200"
											} p-2 font-kumbh font-semibold  border-2 border-black hover:bg-gray-300 transition-colors ease-in-out duration-200 rounded-md`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<p>
												{snapshot.isDragging
													? answer
													: `${index + 1}. ${answer}`}
											</p>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<SmallGrayText className="pt-1">
				1 - most important, drag card to desired position
			</SmallGrayText>
		</div>
	);
};

export default RankInput;
