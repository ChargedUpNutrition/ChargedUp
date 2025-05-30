
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X, ChevronDown, ChevronRight, ShoppingCart, User, LogIn, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';

interface MenuItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { label: 'All Products', href: '/products' },
  {
    label: 'Categories',
    href: '#',
    submenu: [
      { label: 'Pre Workout', href: '/products?category=pre-workout' },
      { label: 'Protein', href: '/products?category=protein' },
      { label: 'Creatine', href: '/products?category=creatine' },
      { label: 'BCAA', href: '/products?category=bcaa' },
      { label: 'Aminos', href: '/products?category=aminos' },
      { label: 'Vitamins', href: '/products?category=vitamins' },
      { label: 'Multivitamin', href: '/products?category=multivitamin' },
      { label: 'Fat Burners', href: '/products?category=fat-burners' },
      { label: 'Pump Supplement', href: '/products?category=pump-supplement' },
      { label: 'Testosterone', href: '/products?category=testosterone' },
      { label: 'Anti-Aging Supplement', href: '/products?category=anti-aging-supplement' },
      { label: 'Dry Spell', href: '/products?category=dry-spell' }
    ]
  }
];

const MobileNav = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { cartCount, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();

  const toggleSubMenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden p-2 text-white">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 sm:max-w-md bg-black/90 backdrop-blur-sm border-gray-800 text-white p-0">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <Logo />
            <SheetClose className="p-2 text-white hover:text-primary transition-colors">
              <X size={24} />
            </SheetClose>
          </div>
          
          <nav className="flex-grow overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label} className="border-b border-gray-800/50">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubMenu(item.label)}
                        className="flex justify-between items-center w-full py-3 px-2 hover:bg-gray-800/50 rounded transition"
                      >
                        <span className="font-medium text-white">{item.label}</span>
                        {expandedItems.includes(item.label) ? (
                          <ChevronDown size={18} className="text-primary" />
                        ) : (
                          <ChevronRight size={18} className="text-primary" />
                        )}
                      </button>
                      
                      {expandedItems.includes(item.label) && (
                        <ul className="pl-4 space-y-1 py-2 bg-gray-900/50 rounded-md my-1">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.label}>
                              <SheetClose asChild>
                                <Link
                                  to={subItem.href}
                                  className="block py-2 px-3 hover:text-primary transition rounded-md hover:bg-black/30"
                                >
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 inline-block"></span>
                                  {subItem.label}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        to={item.href}
                        className="block py-3 px-2 hover:bg-gray-800/50 rounded transition"
                      >
                        <span className="font-medium text-white">{item.label}</span>
                      </Link>
                    </SheetClose>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-auto p-4 border-t border-gray-800 bg-black/50">
            <div className="flex flex-col space-y-3">
              {/* Cart */}
              <SheetClose asChild>
                <button
                  onClick={handleCartClick}
                  className="flex items-center justify-between text-sm text-gray-300 hover:text-primary transition-colors py-2 px-3 hover:bg-gray-800/50 rounded"
                >
                  <div className="flex items-center">
                    <ShoppingCart size={16} className="mr-2" />
                    <span>Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </SheetClose>
              
              {/* Auth */}
              {user ? (
                <>
                  <SheetClose asChild>
                    <Link to="/account" className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center py-2 px-3 hover:bg-gray-800/50 rounded">
                      <User size={16} className="mr-2" />
                      My Account
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center py-2 px-3 hover:bg-gray-800/50 rounded text-left"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </SheetClose>
                </>
              ) : (
                <SheetClose asChild>
                  <Link to="/auth" className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center py-2 px-3 hover:bg-gray-800/50 rounded">
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </Link>
                </SheetClose>
              )}
              
              <SheetClose asChild>
                <Link to="/track-order" className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center py-2 px-3 hover:bg-gray-800/50 rounded">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Track Order
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center py-2 px-3 hover:bg-gray-800/50 rounded">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
