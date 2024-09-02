import React from 'react';
import { Button } from '../ui/button';
import { useAuthContext } from '@/contexts/authContext';
import FileUploadDialog from '@/components/upload-file-dialog'

const Navbar: React.FC = () => {
    const { setAuthToken } = useAuthContext()
    const handleLogout = () => {
        setAuthToken(null);
    }

    return (
        <nav className="bg-primary-foreground shadow-primary-foreground px-4 py-2 flex justify-between items-center">
            <div className="flex space-x-4">
                <FileUploadDialog />
            </div>
            <Button variant="destructive" onClick={handleLogout} className="text-white border-white hover:bg-gray-700">
                Logout
            </Button>
        </nav>
    );
};

export default Navbar;
