"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * ReusableDialog Component
 * @param {React.ReactNode} trigger - Element to trigger the dialog.
 * @param {string} title - Title displayed on the dialog header.
 * @param {React.ReactNode} children - Content inside the dialog body.
 * @param {boolean} open - Controls whether the dialog is open.
 * @param {function} onOpenChange - Function to handle dialog open/close state.
 */
const ReusableDialog = ({ trigger, title, children, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
