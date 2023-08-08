"use client";

import { usePathname } from "next/navigation"
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();

  const routes = data.map((route: Category) => ({
    label: route.name,
    href: `/category/${route.id}`,
    active: pathname === `/category/${route.id}`
  }));

  return (
    <nav
      className="mx-6 flex items-center space-x-4 lg:space-x-6p"
    >
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default MainNav;