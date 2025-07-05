
import { Github, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sa4s-teal-500 to-sa4s-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S4S
              </div>
              <div>
                <div className="font-semibold text-gray-900">SA4S @ SERC</div>
                <div className="text-sm text-gray-600">Research Group</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Self-Adaptive Systems for Sustainable Computing Research Group at IIIT-Hyderabad, 
              advancing the frontiers of adaptive and energy-efficient software systems.
            </p>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Address</h3>
            <div className="text-gray-600 text-sm space-y-1">
              <p>International Institute of Information Technology</p>
              <p>Gachibowli, Hyderabad</p>
              <p>Telangana 500032, India</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-sa4s-teal-500 hover:text-white rounded-lg flex items-center justify-center transition-all duration-150"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-sa4s-blue-500 hover:text-white rounded-lg flex items-center justify-center transition-all duration-150"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 SA4S @ SERC, IIIT-Hyderabad. Built with care using modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
