import React from 'react';
import { Mail,} from 'lucide-react';

const Fotter = ()=> {
  return (
    <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-2 text-[#2A9D8F]" />
          support@travelai.com
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} TravelAI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
}

export default Fotter;