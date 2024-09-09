import Image from 'next/image';
import Logo from '../../assets/images/logo.jpg';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-8xl px-6 py-4">
        <div className="flex items-center cursor-pointer">
          <Image
            src={Logo}
            alt="Company Logo"
            priority
            className="h-8 w-8 mr-2 object-contain"
          />
          <span className="text-2xl font-bold tracking-tight text-vote-primary">
            Voting Platform
          </span>
        </div>
        <div>
          <Button className="bg-primary text-primary-foreground">
            Connect Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
