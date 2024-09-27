

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Pomorando",
  description: "Train your focus with random reward scheduling and variable timer lengths.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
  },
};
