import { Leaf, LucideProps } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const logoVariants = cva("flex items-center justify-center", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-base",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
  },
});

export interface LogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoVariants> {
  iconProps?: LucideProps;
}

export const Logo = ({
  className,
  orientation,
  size = "default",
  iconProps,
}: LogoProps) => {
  const iconSize: Record<Exclude<typeof size, null | undefined>, string> = {
    default: "32",
    sm: "24",
    lg: "40",
    icon: "32",
  };

  return (
    <div className={cn(logoVariants({ orientation, size, className }))}>
      <Leaf color="#96c24e" size={iconSize[size!]} {...iconProps} />
      {size !== "icon" && (
        <span className="px-2 font-bold">書叶 · BookLeaf</span>
      )}
    </div>
  );
};

export default Logo;
