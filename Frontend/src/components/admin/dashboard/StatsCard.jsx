const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  export default StatsCard;