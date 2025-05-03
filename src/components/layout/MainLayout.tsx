
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { SupportBot } from '../ui/support-bot';

interface MainLayoutProps {
  children: ReactNode;
  isConnected?: boolean; // Added optional isConnected prop
}

const MainLayout = ({ children, isConnected }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
         <SupportBot />
    </div>
  );
};

export default MainLayout;
