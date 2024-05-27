"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { ThemeSwitcher } from "./theme-switcher"

const menuItems = [
  {
    title: "Movies",
    href: "/",
  },
]

export const TopBar = () => (
  <NavigationMenu className="sticky top-0 justify-between bg-background p-3">
    {/* Left */}
    <NavigationMenuList>
      {/* Logo */}
      <NavigationMenuItem className="px-1">
        <Link href="/" className="text-xl font-semibold">
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
)
