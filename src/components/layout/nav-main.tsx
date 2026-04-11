import { Link, useNavigate } from 'react-router-dom';

import {
    Activity,
    BarChart3,
    Bell,
    CalendarDays,
    CheckSquare,
    ChevronRight,
    CreditCard,
    FileText,
    Folder,
    FolderKanban,
    Key,
    LayoutDashboard,
    Plug,
    Shield,
    Star,
    User,
    UserPlus,
    Users,
    type LucideIcon,
} from 'lucide-react';

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useInitialSidebarOpen } from '@/lib/navbar/use-initial-sidebar-open';
import { useResolvedActiveRoute } from '@/lib/navbar/use-resolved-active-route';
import { useResolvedRoute } from '@/lib/navbar/use-resolved-route';
import { useSidebarStore } from '@/stores/sidebar.store';
import { type SidebarItem } from '@/types/sidebar';

export function NavMain() {
    const navigate = useNavigate();
    const groups = useSidebarStore(store => store.sidebarData);
    const { state } = useSidebar();

    const { resolvedUrl } = useResolvedRoute();
    const { pathname, isRouteActive, isExact } = useResolvedActiveRoute(resolvedUrl);

    const { openItems, setOpenItems } = useInitialSidebarOpen(groups, pathname, resolvedUrl);

    const ICON_MAP: Record<string, LucideIcon> = {
        Activity,
        BarChart3,
        Bell,
        CalendarDays,
        CheckSquare,
        CreditCard,
        FileText,
        Folder,
        FolderKanban,
        Key,
        LayoutDashboard,
        Plug,
        Shield,
        Star,
        User,
        UserPlus,
        Users,
    };

    const renderItem = (item: SidebarItem) => {
        const hasSubItems = !!item.items?.length;
        const Icon: LucideIcon = (item.icon && ICON_MAP[item.icon]) || Star;
        const parentUrl = resolvedUrl(item.url);

        if (hasSubItems) {
            const isChildActive = !!item.items?.some(sub => isExact(sub.url));
            const isParentActive = isRouteActive(item.url);
            const isOpen = openItems[item.title] ?? (isChildActive || isParentActive);

            return (
                <Collapsible
                    key={item.title}
                    open={isOpen}
                    onOpenChange={open => setOpenItems(prev => ({ ...prev, [item.title]: open }))}
                >
                    <SidebarMenuItem>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex">
                                    <SidebarMenuButton
                                        isActive={isParentActive}
                                        onClick={() => {
                                            setOpenItems(prev => ({ ...prev, [item.title]: true }));
                                            navigate(parentUrl);
                                        }}
                                    >
                                        <Icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                    {state === 'expanded' && (
                                        <button
                                            onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpenItems(prev => ({ ...prev, [item.title]: !prev[item.title] }));
                                            }}
                                        >
                                            <ChevronRight
                                                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                                            />
                                        </button>
                                    )}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.title}</TooltipContent>
                        </Tooltip>

                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.items?.map(sub => (
                                    <SidebarMenuSubItem key={sub.title}>
                                        <SidebarMenuSubButton asChild isActive={isExact(sub.url)}>
                                            <Link to={resolvedUrl(sub.url)}>{sub.title}</Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            );
        }

        return (
            <SidebarMenuItem key={item.title}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={isRouteActive(item.url)}>
                            <Link to={parentUrl}>
                                <Icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
            </SidebarMenuItem>
        );
    };

    return (
        <>
            {groups.map(group => (
                <SidebarGroup key={group.group}>
                    <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map(item => renderItem(item))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
