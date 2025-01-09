const Footer = () => {
    return (
      <footer className=" text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              {/* Replace with X icon */}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
  
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="font-semibold mb-2">Powered by OpenScan.ai</h3>
              <p className="text-sm">
                OpenScan.ai is a Block Explorer and Analytics Platform for XDC, a
                decentralized smart contracts platform.
              </p>
              <button className="mt-2 px-3 py-1 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded">
                Add to XDC Network
              </button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-700">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-700">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Community</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-700">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-700">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-700">
                    Network Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Products & Services</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-700">
                    Explorer-as-a-Service (EaaS)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-700">
                    API Plans
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="border-t pt-4 text-center text-sm">
            <p className="mb-2 text-gray-500">
              © 2025 BlockScan.io All Rights Reserved
            </p>
            <p>
              Donations:{" "}
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600"
              >
                xdc58c43c37a2e74c3452a809c447c223455e21006
              </a>{" "}
              <span className="text-red-500">❤️</span>
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  