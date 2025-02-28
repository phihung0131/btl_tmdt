const TimePeriodSelector = ({
  period,
  onPeriodChange,
}) => (
  <div className="mb-6 flex flex-wrap items-center gap-4">
    <div className="flex rounded-lg bg-white shadow-sm">
      <button
        onClick={() => onPeriodChange("day")}
        className={`rounded-l-lg px-4 py-2 ${period === "day" ? "bg-[#FF3D00] text-white" : "hover:bg-gray-100"}`}
      >
        Ngày
      </button>
      <button
        onClick={() => onPeriodChange("week")}
        className={`px-4 py-2 ${period === "week" ? "bg-[#FF3D00] text-white" : "hover:bg-gray-100"}`}
      >
        Tuần
      </button>
      <button
        onClick={() => onPeriodChange("year")}
        className={`rounded-r-lg px-4 py-2 ${period === "year" ? "bg-[#FF3D00] text-white" : "hover:bg-gray-100"}`}
      >
        Năm
      </button>
    </div>
  </div>
);

export default TimePeriodSelector;
