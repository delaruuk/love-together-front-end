import React from 'react';
import PropTypes from 'prop-types';
import PillButtonLink from 'ui/Links/PillButtonLink';
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';

const bannerImg = require("assets/banner.png");

const PricingChoice = (props) => {
  const { 
    name,
    price,
    pillars,
    description,
    linkUrl,
    variant = 'default',
    banner = null,
  } = props;

  const priceClassName = variant === 'secondary' ? 'text-white' : 'text-secondary';
  const pillarsClassName = variant === 'secondary' ? 'text-white' : 'text-secondary';
  const containerClassName = variant === 'secondary' ? 'bg-secondary' : 'bg-white';
  const textShadow = '2px 2px 4px rgba(0, 0, 0, 0.25)'; // set the text shadow for the price and pillars text

  const [scaleFactor, setScaleFactor] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.clientWidth;
      if (containerWidth) {
        setScaleFactor(1 + (containerWidth - 286) / 500);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`price-choice-container border-black border-2 ${containerClassName}`}>
      {banner && (
        <div 
          className="justify-center border-black border-2" 
          style={{ zIndex: '2', }} 
          >
          <Image
            style={{ 
              maxWidth: 'none',
              right: '-3.2em',
              top: '-1em',
              position: 'absolute',
              transform: `scale(calc(1 + (${scaleFactor} - 1) / 5))`
            }} 
            priority
            src={bannerImg}
            at="banner"
            width={400}
          /> 
          <h2 className="text-black" style={{ zIndex: 3 }}>{banner.text}</h2>
        </div>
      )}

      <h2 className="text-l font-bold text-black mt-2" style={{ fontWeight: 900 }}>{name}</h2>
      <div className="text-center">
        <div className={`text-5xl font-semibold ${priceClassName} mt-2`} style={{ textShadow, display: 'inline-flex', alignItems: 'center' }}>
            {price}
          </div>
          <div className="text-sm font-normal text-gray-500">
            per month
          </div>
        </div>
      <h2 className={`text-3xl font-bold ${pillarsClassName} mt-2`} style={{ textShadow }}>{pillars}</h2>
      <div className={`text-sm my-2 text-center`}>{description}</div>
        <div className="mt-4">
          <PillButtonLink link={linkUrl} text={"Select Plan"} variant="main" />
        </div>
      </div>
      );
};

PricingChoice.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  pillars: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'secondary']),
  banner: PropTypes.shape({
      text: PropTypes.string.isRequired
    })
};

export default PricingChoice;
