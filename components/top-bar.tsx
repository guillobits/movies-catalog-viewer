"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { ThemeSwitcher } from "./theme-switcher";

const menuItems = [
  {
    title: "Movies",
    href: "/",
  },
];

export const TopBar = () => (
  <NavigationMenu className="justify-between p-3 sticky top-0 bg-background">
    {/* Left */}
    <NavigationMenuList>
      
      {/* Logo */}
      <NavigationMenuItem className="px-1">
        <Link href="/" className="font-semibold text-xl">
          Movie//List
        </Link>
      </NavigationMenuItem>

      {/* MenuItems */}
      {menuItems.map((menuItem, idx) => (
        <NavigationMenuItem key={idx}>
          <Link href={menuItem.href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {menuItem.title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}

    </NavigationMenuList>

    {/* Right */}
    <NavigationMenuList>
      <NavigationMenuItem className="self-end">
        <ThemeSwitcher />
      </NavigationMenuItem>
    </NavigationMenuList>
    
  </NavigationMenu>
);
