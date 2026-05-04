export interface BaseBadgeProps {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  outline?: boolean;
}
