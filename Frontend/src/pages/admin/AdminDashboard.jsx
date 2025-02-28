import React, { useState, useEffect } from "react";
import { TrendingUp, Users, DollarSign, ShoppingBag } from "lucide-react";
import apiService from "../../services/api";
import StatsCard from "../../components/admin/dashboard/StatsCard";
import TimePeriodSelector from "../../components/admin/dashboard/TimePeriodSelector";
import PromotionStats from "../../components/admin/dashboard/PromotionStats";
import RevenueByCategory from "../../components/admin/dashboard/RevenueByCategory";
import OrderStatus from "../../components/admin/dashboard/OrderStatus";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Main Dashboard Component
const Dashboard = () => {
  const [period, setPeriod] = useState("day");
  const [ordersSummary, setOrdersSummary] = useState(null);

  // Data states for different periods
  const [data, setData] = useState({});

  // Get current data based on selected period
  const getCurrentData = () => {
    return data[period];
  };

  const currentData = getCurrentData();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Dashboard";
    apiService
      .getReportOrdersSummary()
      .then((res) => {
        setOrdersSummary(res.data.data.ordersSumary);
      })
      .catch((err) => {
        console.error("Error fetching orders summary:", err);
      });

    // Day
    apiService
      .getReportCategory("day")
      .then((res) => {
        // console.log(res.data);
        setData((prevData) => ({
          ...prevData,
          day: {
            ...prevData.day,
            revenueByCategory: res.data.data.revenueByCategory,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching day data:", err);
      });

    apiService
      .getReportPromotion("day")
      .then((res) => {
        // console.log(res.data.data);
        setData((prevData) => ({
          ...prevData,
          day: {
            ...prevData.day,
            promotionData: res.data.data,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching promotion data:", err);
      });

    apiService
      .getReportOverview("day")
      .then((res) => {
        // console.log(res.data.data);
        setData((prevData) => ({
          ...prevData,
          day: {
            ...prevData.day,
            totalOrders: res.data.data.totalOrders,
            totalRevenue: res.data.data.totalRevenue,
            totalCustomers: res.data.data.totalCustomers,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching day data:", err);
      });

    apiService
      .getReportRevenue("day")
      .then((res) => {
        // console.log(res.data.data.revenue);
        setData((prevData) => ({
          ...prevData,
          day: {
            ...prevData.day,
            totalRevenue: res.data.data.revenue.totalRevenue,
            orders: res.data.data.revenue.orders,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching revenue data:", err);
      });

    // Week
    apiService
      .getReportCategory("week")
      .then((res) => {
        // console.log(res.data);
        setData((prevData) => ({
          ...prevData,
          week: {
            ...prevData.week,
            revenueByCategory: res.data.data.revenueByCategory,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching week data:", err);
      });

    apiService
      .getReportPromotion("week")
      .then((res) => {
        // console.log(res.data.data);
        setData((prevData) => ({
          ...prevData,
          week: {
            ...prevData.week,
            promotionData: res.data.data,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching promotion data:", err);
      });

    apiService
      .getReportOverview("week")
      .then((res) => {
        // console.log(res.data.data);
        setData((prevData) => ({
          ...prevData,
          week: {
            ...prevData.week,
            totalOrders: res.data.data.totalOrders,
            totalRevenue: res.data.data.totalRevenue,
            totalCustomers: res.data.data.totalCustomers,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching week data:", err);
      });

    apiService
      .getReportRevenue("week")
      .then((res) => {
        // console.log(res.data.data.revenue);
        setData((prevData) => ({
          ...prevData,
          week: {
            ...prevData.week,
            totalRevenue: res.data.data.revenue.totalRevenue,
            orders: res.data.data.revenue.orders,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching revenue data:", err);
      });

    // Year
    apiService
      .getReportCategory("year")
      .then((res) => {
        // console.log(res.data);
        setData((prevData) => ({
          ...prevData,
          year: {
            ...prevData.year,
            revenueByCategory: res.data.data.revenueByCategory,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching year data:", err);
      });

    apiService
      .getReportPromotion("year")
      .then((res) => {
        // console.log(res.data.data);
        setData((prevData) => ({
          ...prevData,
          year: {
            ...prevData.year,
            promotionData: res.data.data,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching promotion data:", err);
      });

    apiService
      .getReportOverview("year")
      .then((res) => {
        // console.log(res.data.data);
        setData((prevData) => ({
          ...prevData,
          year: {
            ...prevData.year,
            totalOrders: res.data.data.totalOrders,
            totalRevenue: res.data.data.totalRevenue,
            totalCustomers: res.data.data.totalCustomers,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching year data:", err);
      });

    apiService
      .getReportRevenue("year")
      .then((res) => {
        // console.log(res.data.data.revenue);
        setData((prevData) => ({
          ...prevData,
          year: {
            ...prevData.year,
            totalRevenue: res.data.data.revenue.totalRevenue,
            orders: res.data.data.revenue.orders,
          },
        }));
      })
      .catch((err) => {
        console.error("Error fetching revenue data:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b p-4 md:p-6">
        <h1 className="font-bold text-[#FF3D00] md:mb-6 md:text-2xl">
          Dashboard
        </h1>
        <div className="min-h-screen p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <TimePeriodSelector
                period={period}
                onPeriodChange={(p) => setPeriod(p)}
              />
            </div>

            {/* Stats Grid */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Tổng đơn hàng"
                value={currentData?.totalOrders}
                icon={ShoppingBag}
                color="bg-[#FF3D00]"
              />
              <StatsCard
                title="Doanh thu"
                value={formatCurrency(currentData?.totalRevenue)}
                icon={DollarSign}
                color="bg-[#FF3D00]"
              />
              <StatsCard
                title="Khách hàng"
                value={currentData?.totalCustomers}
                icon={Users}
                color="bg-[#FF3D00]"
              />
              <StatsCard
                title="Giá trị TB đơn hàng"
                value={formatCurrency(ordersSummary?.overallAverageValue)}
                icon={TrendingUp}
                color="bg-[#FF3D00]"
              />
            </div>

            {/* Main Content Grid */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left Column */}
              <div className="space-y-6 lg:col-span-8">
                {/* Revenue by Category */}
                <RevenueByCategory
                  revenueByCategory={currentData?.revenueByCategory || []}
                />

                {/* Recent Orders - Only show for year view or when there are orders */}
                {(period === "year" ||
                  (currentData?.orders && currentData?.orders.length > 0)) && (
                  <RecentOrders orders={currentData?.orders || []} />
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6 lg:col-span-4">
                {/* Order Status */}
                <OrderStatus statusBreakdown={ordersSummary?.statusBreakdown} />

                {/* Promotion Stats */}
                <PromotionStats
                  promotionData={
                    period === "day"
                      ? data?.day?.promotionData
                      : {
                          "Tong So Khuyen Mai ": 0,
                          "So Khuyen mai duoc su dung": 0,
                          "So san pham da ban duoc co khuyen mai": 0,
                          Chi_tiet: [],
                        }
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
