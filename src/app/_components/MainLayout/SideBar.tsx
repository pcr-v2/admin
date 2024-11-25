"use client";

import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import DownArrow from "@/assets/icon/down-arrow.svg";
import Logo from "@/assets/logo/main-logo.png";
import { SIDE_MENUS } from "@/config/Menus";

export default function SideBar() {
  const pathName = usePathname();
  const router = useRouter();

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>(() => {
    return SIDE_MENUS.reduce(
      (acc, menu) => {
        acc[menu.name] = menu.opened || false;
        return acc;
      },
      {} as { [key: string]: boolean },
    );
  });

  const handleToggleMenu = (parentName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [parentName]: !prev[parentName],
    }));
  };

  const handleClickChildMenu = (path: string) => {
    router.push(path);
  };

  return (
    <Wrapper>
      <LogoImg src={Logo.src} alt="logo" />

      <MenuPart>
        {SIDE_MENUS.map((menu, index) => {
          const isOpen = openMenus[menu.name] || false;
          return (
            <MenuInner key={`menuKet_${index}`}>
              <ParentMenu onClick={() => handleToggleMenu(menu.name)}>
                {menu?.icon}
                <ParentName>
                  <span>{menu.name}</span>
                  <motion.img
                    src={DownArrow.src}
                    alt="down"
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </ParentName>
              </ParentMenu>
              <AnimatePresence initial={true}>
                {openMenus[menu.name] && (
                  <ChildrenMenus
                    key={menu.name}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "119.5px" },
                      collapsed: {
                        opacity: 0,
                        height: "0px",
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      easeOut: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    {menu.children &&
                      menu.children.map((child) => {
                        const isCurrent = pathName === child.path; // 현재 경로 확인
                        return (
                          <ChildMenu
                            key={child.name}
                            iscurrent={isCurrent.toString()}
                            onClick={() => handleClickChildMenu(child.path)}
                          >
                            {child.name}
                          </ChildMenu>
                        );
                      })}
                  </ChildrenMenus>
                )}
              </AnimatePresence>
            </MenuInner>
          );
        })}
      </MenuPart>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "48px",
    display: "flex",
    padding: "32px",
    flexDirection: "column",
    borderRight: "1px solid #bcbcbc",
  };
});

const LogoImg = styled("img")(() => {
  return {
    width: "240px",
    height: "40px",
  };
});

const MenuPart = styled(Box)(() => {
  return {
    gap: "16px",
    display: "flex",
    flexDirection: "column",
  };
});

const MenuInner = styled(motion.header)(() => {
  return {
    gap: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
});

const ParentMenu = styled(motion.div)(() => {
  return {
    gap: "12px",
    width: "100%",
    padding: "8px",
    display: "flex",
    borderRadius: "12px",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#fafafa",
    },
  };
});

const ParentName = styled(Box)(() => {
  return {
    width: "100%",
    fontWeight: 700,
    display: "flex",
    fontSize: "24px",
    color: "#616161",
    alignItems: "center",
    justifyContent: "space-between",
  };
});

const ChildrenMenus = styled(motion.section)(() => {
  return {
    gap: "4px",
    display: "flex",
    fontSize: "18px",
    color: "#616161",
    paddingLeft: "32px",
    flexDirection: "column",
    transition: "all 1.5s easeInOut",
  };
});

const ChildMenu = styled(Box)<{ iscurrent: string }>(({ iscurrent }) => ({
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "12px",

  color: iscurrent === "true" ? "#3196ff" : "#616161",
  backgroundColor: iscurrent === "true" ? "#e5f2ff" : "transparent",

  "&:hover": {
    color: "#3196ff",
  },
}));
