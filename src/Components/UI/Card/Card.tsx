import { FC, ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  footer?: ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerActions,
  footer,
  variant = "default",
  size = "md",
  hover = false,
  className = "",
  onClick,
}) => {
  // Базові класи
  const baseClasses = "rounded-xl border transition-all duration-200";

  // Варіанти стилів
  const variantClasses = {
    default: "bg-gray-800 border-gray-600",
    elevated: "bg-gray-800 border-gray-600 shadow-lg",
    outlined: "bg-transparent border-gray-600",
    filled: "bg-gray-700 border-gray-600",
  };

  // Розміри
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  // Hover ефект
  const hoverClasses = hover
    ? "hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 cursor-pointer"
    : "";

  // Click handler
  const clickClasses = onClick ? "cursor-pointer" : "";

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${clickClasses} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Header */}
      {(title || subtitle || headerActions) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            )}
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>

          {headerActions && (
            <div className="ml-4 flex-shrink-0">{headerActions}</div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="text-gray-300">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-6 pt-4 border-t border-gray-600">{footer}</div>
      )}
    </div>
  );
};
