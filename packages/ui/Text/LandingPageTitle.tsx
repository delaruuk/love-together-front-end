interface TitleTextProps {
	text: string;
	className?: string;
	style?: React.CSSProperties;
  }
  
  const TitleText = ({ text, className = '', style = {} }: TitleTextProps) => {
	return (
	  <h1
		className={`text-5xl font-extrabold ${className}`}
		style={style}
	  >
		{text}
	  </h1>
	);
  };
  
  export default TitleText;