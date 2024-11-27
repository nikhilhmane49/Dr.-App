import React from "react";
import about_image from "../assets/assets_frontend/about_image.png";

function About() {
  return (
    <>
      <div className="text-center mx-4 sm:mx-6 lg:mx-16 py-8 sm:py-10 lg:py-16">
        <p className="text-xl sm:text-2xl lg:text-4xl font-semibold mb-6 sm:mb-10">
          ABOUT <span className="font-bold text-primary">US</span>
        </p>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start text-gray-600 gap-6 sm:gap-8 lg:gap-16">
          {/* Image */}
          <img
            className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[400px] rounded-lg shadow-lg object-cover"
            src={about_image}
            alt="About Us"
          />

          {/* Text Section */}
          <div className="text-base sm:text-lg lg:text-xl text-left space-y-4 sm:space-y-6 lg:w-[60%]">
            <p>
              Welcome to{" "}
              <span className="font-bold text-primary">Prescripto</span>, your
              trusted partner in managing your healthcare needs conveniently and
              efficiently. We understand the challenges individuals face when it
              comes to scheduling doctor appointments and managing their health
              records.
            </p>
            <p>
              At Prescripto, we are committed to excellence in healthcare
              technology. We continuously strive to enhance our platform,
              integrating the latest advancements to improve user experience and
              deliver superior service. Whether you're booking your first
              appointment or managing ongoing care, Prescripto is here to
              support you every step of the way.
            </p>
            <div className="space-y-2 sm:space-y-4">
              <p className="text-lg sm:text-2xl font-bold">Our Vision</p>
              <p>
                Our vision at Prescripto is to create a seamless healthcare
                experience for every user. We aim to bridge the gap between
                patients and healthcare providers, making it easier for you to
                access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-12 sm:mt-16 lg:mt-24">
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 mb-6 sm:mb-8">
            Why <span className="font-bold text-primary">Choose Us</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 justify-center items-center lg:w-[70%] mx-auto">
            {/* Card 1 */}
            <div className="w-full sm:w-[30%] bg-white border border-gray-300 rounded-lg p-4 sm:p-6 text-left hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-lg">
              <p className="text-lg sm:text-xl font-semibold mb-2">
                Efficiency
              </p>
              <p className="text-sm sm:text-base">
                Streamlined appointment scheduling that fits into your busy
                lifestyle.
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-full sm:w-[30%] bg-white border border-gray-300 rounded-lg p-4 sm:p-6 text-left hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-lg">
              <p className="text-lg sm:text-xl font-semibold mb-2">
                Convenience
              </p>
              <p className="text-sm sm:text-base">
                Access to a network of trusted healthcare professionals in your
                area.
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-full sm:w-[30%] bg-white border border-gray-300 rounded-lg p-4 sm:p-6 text-left hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-lg">
              <p className="text-lg sm:text-xl font-semibold mb-2">
                Personalization
              </p>
              <p className="text-sm sm:text-base">
                Tailored recommendations and reminders to help you stay on top
                of your health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
