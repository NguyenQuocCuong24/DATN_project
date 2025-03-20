"use client";
import { IconDot } from "@/components/IconDot";
import { ColorCommon } from "@/constants/color-common";
import { baseMenu } from "@/types/sidebar.type";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { JSX, useEffect, useState } from "react";
export interface ISidebarProps {
  headerSidebar?: JSX.Element;
  menu: baseMenu[];

  pathName: string;
  spacing?: string;
}
const Sidebar = (props: ISidebarProps) => {
  const { menu, headerSidebar, pathName, spacing } = props;
  const [openItems, setOpenItems] = useState<any>({});

  const router = useRouter();
  useEffect(() => {
    menu.forEach((item: any) => {
      if (item.subMenuItems) {
        item.subMenuItems.forEach((child: any) => {
          if (pathName.includes(child.path)) {
            setOpenItems((prevOpenItems: any) => ({
              ...prevOpenItems,
              [item.id]: true,
            }));
          }
        });
      }
    });
  }, [pathName, menu]);

  const handleClickItem = async (id: number, path: string) => {
    setOpenItems((prevOpenItems: any) => ({
      [id]: !prevOpenItems[id],
    }));
  };

  const handleClickChild = async (id: number) => {
    setOpenItems((prevOpenItems: any) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  };

  return (
    <Box className={`border-r border-grayColor h-full`}>
      {headerSidebar && headerSidebar}
      <List>
        {menu.map((item: any, index: number) => (
          <React.Fragment key={item.id}>
            <Link
              href={!item.action ? item.path : ""}
              onClick={async (e: any) => {
                if (item.action) {
                  item.action();
                }
                if (!item.path) {
                  e.preventDefault();
                }
                if (item.subMenu) {
                  const isActiveSubMenu = item.subMenuItems?.some(
                    (item: any) => item.path === pathName
                  );
                  if (isActiveSubMenu) {
                    await handleClickChild(item.id);
                  } else {
                    router.push(`${item.subMenuItems[0].path}`);
                  }
                } else {
                  await handleClickItem(item.id, item.path);
                }
              }}
              className={`${menu.length - 1 === index
                  ? "block border-t border-grayColor mt-4 pt-4"
                  : ""
                } `}
            >
              <ListItem
                className={`cursor-pointer hover:bg-sidebar-hover ${(pathName.includes(item.path) && item.path) ||
                    item.subMenuItems?.some((item: any) => pathName === item.path)
                    ? "bg-active-sidebar"
                    : ""
                  }`}
              >
                <ListItemIcon
                  sx={{ minWidth: spacing ? spacing : "56px" }}
                  className={`pr-2`}
                >
                  {item.icon ? (
                    item.icon
                  ) : item.subMenuItems ? (
                    <Image
                      className=''
                      src={
                        openItems[item.id]
                          ? (pathName.includes(item.path) && item.path) ||
                            item.subMenuItems?.some((item: any) =>
                              pathName.includes(item.path)
                            )
                            ? "/assets/icons/icon_arrow_down_primary.svg"
                            : "/assets/icons/icon_arrow_down.svg"
                          : (pathName.includes(item.path) && item.path) ||
                            item.subMenuItems?.some((item: any) =>
                              pathName.includes(item.path)
                            )
                            ? "/assets/icons/icon_arrow_right_primary.svg"
                            : "/assets/icons/icon_arrow_right.svg"
                      }
                      alt='icon-arrow'
                      width={20}
                      height={20}
                    />
                  ) : (
                    <IconDot
                      color={
                        (pathName.includes(item.path) && item.path) ||
                          item.subMenuItems?.some((item: any) =>
                            pathName.includes(item.path)
                          )
                          ? ColorCommon.primary
                          : ColorCommon.grayMiddle
                      }
                    />
                  )}
                </ListItemIcon>
                <Typography
                  variant='body1'
                  className={`${(pathName.includes(item.path) && item.path) ||
                      item.subMenuItems?.some((item: any) =>
                        pathName.includes(item.path)
                      )
                      ? "text-primary !font-semibold"
                      : "text-grayMiddle"
                    }`}
                >
                  {item.title}
                </Typography>
              </ListItem>
            </Link>
            {item.subMenuItems && (
              <Collapse in={openItems[item.id]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.subMenuItems.map((child: any) => (
                    <Link
                      key={child.id}
                      href={child.path}
                      onClick={(e: any) => {
                        e.stopPropagation();
                      }}
                    >
                      <ListItem className='cursor-pointer hover:bg-sidebar-hover relative'>
                        <Box
                          className={`ml-2 h-full w-full transition-all duration-300 absolute border-l ${pathName.includes(child.path)
                              ? "border-primary"
                              : "border-[#B6B6B6]"
                            }`}
                        ></Box>
                        <Stack direction='row'>
                          <ListItemIcon></ListItemIcon>
                          <Typography
                            variant='body1'
                            fontWeight={400}
                            className={`${pathName.includes(child.path)
                                ? "text-primary"
                                : "text-grayMiddle"
                              }`}
                          >
                            {child.title}
                          </Typography>
                        </Stack>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
