import { Toaster } from '@/components/ui/sonner';
import { ConfirmationDialog } from '@/systems/confirmation/components/confirmation-dialog';
import '@/lib/api/interceptors';

import { QueryProvider } from './query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            {children}
            <ConfirmationDialog />
            <Toaster richColors />
        </QueryProvider>
    );
}
