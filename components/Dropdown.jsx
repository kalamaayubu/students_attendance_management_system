"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dropdown = ({ trigger, label, menuItems }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={`ml-20 mb-10`}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && <DropdownMenuSeparator />}
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className="hover:bg-gray-500 cursor-pointer"
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
