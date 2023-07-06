import RegularText from "../Text/RegularText";

type DividerProps = {};

const Divider = (props: DividerProps) => {
	return (
		<section className="py-10 bg-main">
			<div className="mx-auto px-4 max-w-3xl text-white text-xl md:text-2xl">
				<RegularText className="pb-4">
					{
						"Our app identifies key areas for conversation, empowering you both to navigate your relationship's path to success."
					}
				</RegularText>
				<RegularText>
					Strengthen your bond and create lasting happiness together.
				</RegularText>
			</div>
		</section>
	);
};

export default Divider;
