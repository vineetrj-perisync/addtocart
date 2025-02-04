import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CardContext'; 

function Navbar() {
  const { cart } = useContext(CartContext); 

  const uniqueProducts = Object.keys(cart).length;

  return (
    <div className="shadow-md   md:block">
      <nav className=" container flex items-center justify-between h-20 bg-white px-6  sticky top-0 z-50 w-full ">
        <div className="flex items-center gap-8">
          <div>
            <img src="/images/logo.png" alt="Logo" className="w-20" />
          </div>
          <div>
            <input
              className= " md:block md:w-[300px] p-1 border-2 outline-slate-600   hidden lg:w-[500px]"
              placeholder="Search for Products"
            />
          </div>
        </div>
        <div className="flex items-center gap-5 cursor-pointer">
          <div className="flex items-center gap-2">
            <div>
              <img src="/images/pin.png" alt="Location" className="w-6" />
            </div>
            <div className='text-sm md:text-lg'>Select Location</div>
          </div>
          <div>
            <img src="/images/profile.png" alt="Profile" className="w-6" />
          </div>
          <div>
            <Link to="/addcart">
              <div className="relative">
                <img src="/images/vegetables.png" alt="Cart" className="w-6" />
                {uniqueProducts > 0 && (
                  <div className="absolute top-1 right-0 bg-red-500 text-white text-xs rounded-md w-5 h-5 flex items-center justify-center">
                    {uniqueProducts}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

export default Navbar;
