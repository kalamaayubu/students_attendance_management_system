"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader, MoreHorizontal } from "lucide-react";
import Dropdown from "../Dropdown";
import { promoteUser } from "@/actions/admin/promoteUser";
import { useState } from "react";
import { toast } from "react-toastify";

const StudentsTable = ({ students }) => {
  const [loadingUser, setLoadingUser] = useState(null); // Track loading for each student

  const handlePromoteUser = async (userId) => {
    setLoadingUser(userId); // Set processing state for this student
    try {
      const res = await promoteUser(userId);
      if (res.success) {
        toast.success(res.message);
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error promoting user:", error);
    } finally {
      setLoadingUser(null);
    }
  };

  return (
    <Table className={``}>
      <TableCaption>A list of all students.</TableCaption>
      <TableHeader>
        <TableRow className={`whitespace-nowrap`}>
          <TableHead className="w-[100px]">First name</TableHead>
          <TableHead>Second name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Phone</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students?.map((student) => {
          const menuItems = [
            {
              title: "Promote",
              onClick: () => handlePromoteUser(student.id),
            },
            { title: "Edit" },
            { title: "Delete" },
          ];
          return (
            <TableRow key={student.id} className={``}>
              <TableCell className="font-medium">
                {student.first_name}
              </TableCell>
              <TableCell>{student.second_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell className="text-right">{student.phone}</TableCell>
              <TableCell>
                {/* MoreHorizontal icon triggers dropdown menu */}
                <Dropdown
                  trigger={
                    loadingUser === student.id ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <MoreHorizontal className="w-4 mt-[6px] ml-6 cursor-pointer" />
                    )
                  }
                  menuItems={menuItems}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StudentsTable;
