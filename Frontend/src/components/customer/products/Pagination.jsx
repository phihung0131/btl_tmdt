import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className = "justify-center",
}) => {
  // Hàm tạo mảng các số trang cần hiển thị
  const getPageNumbers = () => {
    // Luôn hiển thị trang đầu, trang cuối và các trang xung quanh trang hiện tại
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Kiểm tra xem có cần hiển thị dots không
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Trường hợp không cần dots, hiển thị tất cả
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Không có dots bên trái
      const leftItemCount = 3 + 2 * siblingCount;
      return [
        ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
        "rightDots",
        totalPages,
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Không có dots bên phải
      const rightItemCount = 3 + 2 * siblingCount;
      return [
        1,
        "leftDots",
        ...Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1,
        ),
      ];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      // Có dots cả hai bên
      return [
        1,
        "leftDots",
        ...Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i,
        ),
        "rightDots",
        totalPages,
      ];
    }
  };

  const pages = getPageNumbers();

  // Nút chuyển trang
  const PageButton = ({
    page,
    isActive = false,
    onClick,
    disabled = false,
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg px-3.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "text-gray-700 hover:bg-gray-100"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
    >
      {page}
    </button>
  );

  // Nút điều hướng (prev/next)
  const NavigationButton = ({ direction, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
    >
      {direction === "left" ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );

  // Dots separator
  const DotsSeparator = () => (
    <div className="flex h-10 w-10 items-center justify-center">
      <MoreHorizontal className="h-5 w-5 text-gray-400" />
    </div>
  );

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Previous button */}
      <NavigationButton
        direction="left"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      />

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages?.map((page, index) => {
          if (page === "leftDots" || page === "rightDots") {
            return <DotsSeparator key={`dots-${index}`} />;
          }

          return (
            <PageButton
              key={page}
              page={page}
              isActive={currentPage === page}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onPageChange(page);
              }}
            />
          );
        })}
      </div>

      {/* Next button */}
      <NavigationButton
        direction="right"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
