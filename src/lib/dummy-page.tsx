import { lazy } from "react";

export const dummy = (label: string) =>
    lazy(() =>
        Promise.resolve({
            default: function DummyPage() {
                return (
                    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                        {label} — dummy page
                    </div>
                );
            },
        })
    );