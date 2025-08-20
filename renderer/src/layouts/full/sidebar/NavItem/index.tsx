import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import { baselightTheme } from "../../../../theme/DefaultColors";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon ? item.icon : null;
  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "6px 0",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: baselightTheme.palette.primary.light,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: baselightTheme.palette.text.secondary,
      },
      "&.Mui-selected": {
        backgroundColor: baselightTheme.palette.primary.light,
        color: baselightTheme.palette.text.primary,
      "&:hover": {
        backgroundColor: baselightTheme.palette.primary.light,
        color: baselightTheme.palette.text.primary,
      },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
        >
          {Icon && (
            <ListItemIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color: "inherit",
              }}
            >
              <Icon stroke={1.5} size="1.3rem" />
            </ListItemIcon>
          )}
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
