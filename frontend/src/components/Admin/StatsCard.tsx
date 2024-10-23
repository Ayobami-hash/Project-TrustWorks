interface StatsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: string;  // Add the color prop
  }
  
  const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color = 'bg-gray-100' }) => {
    return (
      <div className={`p-4 rounded-lg shadow-md flex items-center ${color}`}>
        <div className="text-gray-500">{icon}</div>
        <div className="ml-4">
          <p className="text-gray-700 font-medium">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    );
  };
  
  export default StatsCard;
  