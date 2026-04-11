import { Toaster } from '@/components/ui/sonner';
import { ConfirmationDialog } from '@/systems/confirmation/components/confirmation-dialog';
import '@/lib/api/interceptors';

import { QueryProvider } from './query-provider';

const DevRoleSwitcher = import.meta.env.DEV
    ? (await import('@/components/dev/dev-role-switcher')).DevRoleSwitcher
    : null;

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            {children}
            <ConfirmationDialog />
            <Toaster richColors />
            {DevRoleSwitcher && <DevRoleSwitcher />}
        </QueryProvider>
    );
}
