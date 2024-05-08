import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  ListItemIcon,
  Button,
  Box,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

interface EdgeFilterDropdownProps {
  filterByEdgeType: string[];
  setFilterByEdgeType: React.Dispatch<React.SetStateAction<string[]>>;
}

function EdgeFilterDropdown({
  filterByEdgeType,
  setFilterByEdgeType,
}: EdgeFilterDropdownProps) {
  const types = [
    "HALL",
    "DEPT",
    "CONF",
    "ELEV",
    "EXIT",
    "INFO",
    "LABS",
    "REST",
    "RETL",
    "STAI",
    "SERV",
    "BATH",
  ];

  const [openSubMenu, setOpenSubMenu] = React.useState<"type" | null>(null);

  const handleFilterChange = (
    value: string,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const currentIndex = filter.indexOf(value);
    const newChecked = [...filter];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFilter(newChecked);
  };

  const toggleSubMenu = (category: "type"): void => {
    setOpenSubMenu((prev) => (prev === category ? null : category));
  };

  const handleResetFilters = () => {
    setFilterByEdgeType([]);
  };

  return (
    <FormControl
      size="small"
      sx={{ minWidth: 176, fontFamily: "Poppins, sans-serif" }}
    >
      <Select
        multiple
        value={[...filterByEdgeType]}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <div className="text-gray-500">
            <FilterListIcon className="text-gray-500" />
            {selected.length > 0 ? ` ${selected.length} selected` : " Filter"}
          </div>
        )}
        displayEmpty
        className="bg-gray-50 h-[2.4rem]"
        sx={{ fontFamily: "Poppins, sans-serif", borderRadius: 2 }}
      >
        <MenuItem onClick={() => toggleSubMenu("type")}>
          <ListItemIcon>
            {openSubMenu === "type" ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary="Types"
            primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
          />
        </MenuItem>

        <Box
          sx={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          {openSubMenu === "type" &&
            types.map((type) => (
              <MenuItem
                key={type}
                value={type}
                sx={{ pl: 3 }}
                onClick={() =>
                  handleFilterChange(
                    type,
                    filterByEdgeType,
                    setFilterByEdgeType,
                  )
                }
              >
                <Checkbox
                  size="small"
                  checked={filterByEdgeType.includes(type)}
                />
                <ListItemText
                  primary={type}
                  primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
                />
              </MenuItem>
            ))}
        </Box>

        <hr className="mx-auto w-4/5" />
        <MenuItem
          style={{
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleResetFilters}
            variant="contained"
            style={{
              backgroundColor: "#EA422D",
              color: "white",
              width: "60%",
              padding: ".2rem",
              marginTop: ".4rem",
              fontFamily: "Poppins, sans-serif",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            endIcon={
              <svg
                fill="white"
                width="14px"
                height="14px"
                viewBox="0 0 1920 1920"
              >
                <path
                  d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                  fill-rule="evenodd"
                />
              </svg>
            }
          >
            RESET
          </Button>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default EdgeFilterDropdown;
