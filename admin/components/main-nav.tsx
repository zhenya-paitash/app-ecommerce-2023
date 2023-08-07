'use client';

import { useParams, usePathname } from "next/navigation";
import {
  AppWindow,
  BaggageClaim,
  Home,
  Palette,
  Ruler,
  Settings,
  ShoppingBag,
  Tag,
} from 'lucide-react';

import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      label: 'Overview',
      icon: <Home />,
      href: `/${params.storeId}`,
      active: pathname === `/${params.storeId}/settings`
    },
    {
      label: 'Billboards',
      icon: <AppWindow />,
      href: `/${params.storeId}/billboards`,
      active: pathname === `/${params.storeId}/billboards`
    },
    {
      label: 'Categories',
      icon: <Tag />,
      href: `/${params.storeId}/categories`,
      active: pathname === `/${params.storeId}/categories`
    },
    {
      label: 'Sizes',
      icon: <Ruler />,
      href: `/${params.storeId}/sizes`,
      active: pathname === `/${params.storeId}/sizes`
    },
    {
      label: 'Colors',
      icon: <Palette />,
      href: `/${params.storeId}/colors`,
      active: pathname === `/${params.storeId}/colors`
    },
    {
      label: 'Products',
      icon: <ShoppingBag />,
      href: `/${params.storeId}/products`,
      active: pathname === `/${params.storeId}/products`
    },
    {
      label: 'Orders',
      icon: <BaggageClaim />,
      href: `/${params.storeId}/orders`,
      active: pathname === `/${params.storeId}/orders`
    },
    {
      label: 'Settings',
      icon: <Settings />,
      href: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`
    }
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
    >
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? 'text-black dark:text-white font-bold' : 'text-muted-foreground'
          )}
        >
          <span className="max-md:hidden">{route.label}</span>
          <span className="md:hidden">{route.icon}</span>
        </Link>
      ))}
    </nav>
  );
}