"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  // Determine the color class based on the progress value
  const progressColorClass = React.useMemo(() => {
    const progressValue = value ?? 0;
    if (progressValue < 10) return "progress-very-low"; // For 0-9%
    if (progressValue < 20) return "progress-low"; // For 10-19%
    if (progressValue < 30) return "progress-regular"; // For 20-29%
    if (progressValue < 40) return "progress-regular-light"; // For 30-39%
    if (progressValue < 50) return "progress-medium-low"; // For 40-49%
    if (progressValue < 60) return "progress-medium"; // For 50-59%
    if (progressValue < 70) return "progress-medium-high"; // For 60-69%
    if (progressValue < 80) return "progress-high-light"; // For 70-79%
    if (progressValue < 90) return "progress-high"; // For 80-89%
    return "progress-very-high"; // For 90-100%
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          progressColorClass // Apply the dynamic color class
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
