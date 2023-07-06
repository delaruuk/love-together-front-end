import type { NextPageWithLayout } from "models";
import TitleTextUnderline from "ui/Text/TitleTextUnderline";
import { useState, useEffect } from "react";



const Index: NextPageWithLayout = () => {
    const [imageIndex, setImageIndex] = useState(0);
    
    const handlePreviousClick = () =>{
        setImageIndex((prevIndex) => (prevIndex - 1 + 4) % 4);   
    };

    const handleNextClick = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    useEffect(() => {
        showSlide(imageIndex);
    }, [imageIndex]);

    function showSlide(n: number) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");

        // loop through each slide and apply the changes
        for (let i = 0; i < slides.length; i++) {
            // Add hidden class to all the slides that are NOT selected
            if (i !== n) {
                slides[i].classList.add("hidden");
            } else {
                slides[i].classList.remove("hidden");
            }
        }

        // loop through each dot and apply the changes
        for (let i = 0; i < dots.length; i++) {
            // Add background color to all the dots that are NOT selected
            if (i !== n) {
                dots[i].classList.remove("bg-yellow-500");
                dots[i].classList.add("bg-green-600");
            } else {
                dots[i].classList.add("bg-yellow-500");
                dots[i].classList.remove("bg-green-600");
            }
        }
    }

    return (
        <div className="platform-features-container flex flex-col">
			<div className="platform-features-text flex flex-col text-center mt-10">
                <h1 className="text-3xl">
                    Platform Features
                </h1>
                <p className="mr-10 ml-10">
                </p>
            </div>
            <div className="flex flex-cols justify-center" style={{ marginTop: '15vh' }}>
                <div className="image-placeholder">
                    <img
                        src="https://dummyimage.com/512x512/000/fff"
                        alt="Placeholder image 1"
                        className={`image-transition ${imageIndex === 0 && 'active'}`}
                    />
                    <img
                        src="https://dummyimage.com/512x512/000/aaa"
                        alt="Placeholder image 2"
                        className={`image-transition ${imageIndex === 1 && 'active'}`}
                    />
                    <img
                        src="https://dummyimage.com/512x512/000/fff"
                        alt="Placeholder image 3"
                        className={`image-transition ${imageIndex === 2 && 'active'}`}
                    />
                    <img
                        src="https://dummyimage.com/512x512/000/aaa"
                        alt="Placeholder image 4"
                        className={`image-transition ${imageIndex === 3 && 'active'}`}
                    />
                </div>
            </div>
            <div className="flex justify-center text-white" style={{ zIndex: 3 }}>
                <button className="mr-10" onClick={handlePreviousClick}>
                    Previous
                </button>
                <button className="mr-20" onClick={handleNextClick}>
                    Next
                </button>
            </div>
            <div className="platform-features-text flex flex-rows" style={{ marginTop: '10em'}}>
                <div className="relative text-center">
                    <h1 className="text-l">
                        Personalized Approach
                    </h1>
                    <p>
                        Get advice based on you on your behaviors and views.
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Index;