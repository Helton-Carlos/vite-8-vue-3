export interface BaseStatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  description?: string;
}
