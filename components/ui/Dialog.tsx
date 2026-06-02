"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const contentMotion = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 16, scale: 0.98 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

type DialogContentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  showClose?: boolean;
  size?: "default" | "wide" | "panel";
};

const sizeStyles = {
  default: "max-w-lg",
  wide: "max-w-3xl",
  panel:
    "right-6 top-6 bottom-6 left-auto max-w-md w-[calc(100vw-3rem)] sm:w-[420px] translate-x-0 translate-y-0",
};

export const DialogContent = forwardRef<
  HTMLDivElement,
  DialogContentProps
>(
  (
    { children, className, showClose = true, size = "default", ...props },
    ref,
  ) => {
    return (
      <DialogPrimitive.Portal forceMount>
        <AnimatePresence>
          <DialogPrimitive.Overlay key="dialog-overlay" forceMount asChild>
            <motion.div
              {...overlayMotion}
              className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm"
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content
            key="dialog-content"
            ref={ref}
            forceMount
            asChild
            {...props}
          >
            <motion.div
              {...contentMotion}
              className={cn(
                "fixed z-50 glass rounded-3xl shadow-card",
                size === "panel"
                  ? sizeStyles.panel
                  : "left-1/2 top-1/2 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2",
                size !== "panel" && sizeStyles[size],
                className,
              )}
            >
              {children}
              {showClose && (
                <DialogPrimitive.Close
                  className="absolute right-5 top-5 rounded-full p-2 text-ivory-mute transition-colors hover:bg-ink-veil hover:text-gold"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </DialogPrimitive.Close>
              )}
            </motion.div>
          </DialogPrimitive.Content>
        </AnimatePresence>
      </DialogPrimitive.Portal>
    );
  },
);
DialogContent.displayName = "DialogContent";
