import LandingLayout from "./LandingLayout";

type NewPageLayoutProps = {
  children: React.ReactNode;
};

const FrontPageLayout: React.FC<NewPageLayoutProps> = ({ children }) => {
  return (
      <div className="flex flex-col">
        {children}
      </div>
  );
};

export default FrontPageLayout;
