import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#213343] px-10 py-10 font-sans tracking-wide">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">
            Quick Links
          </h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Newsroom
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">
            Services
          </h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Web Development
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Testing Automation
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                AWS Development Services
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Mobile App Development
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">
            Platforms
          </h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Hubspot
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Marketo Integration Services
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Marketing Glossary
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                UIPath
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-lg font-semibold text-[#FFA726]">Company</h4>
          <ul className="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Accessibility
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] text-gray-300 transition-all hover:text-[#FFA726]"
              >
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-[#6b5f5f] pt-8 text-center">
        <p className="text-[15px] text-gray-300">
          © ReadymadeUI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
