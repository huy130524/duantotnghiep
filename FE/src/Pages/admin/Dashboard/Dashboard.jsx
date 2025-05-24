import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { useMemo, useState, useEffect } from "react";
import {
  Card,
  DatePicker,
  Radio,
  Row,
  Col,
  Statistic,
  Table,
  Flex,
  ConfigProvider,
  Spin,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import updateLocale from "dayjs/plugin/updateLocale";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import viVN from "antd/locale/vi_VN";
import { formatPrice } from "../../../utils/formatPrice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("vi");

const Dashboard = () => {
  const [date, setDate] = useState(dayjs());

  const [filter, setFilter] = useState("month");

  useEffect(() => {
    if (date > dayjs()) {
      setDate(dayjs());
    }
  }, [date]);

  const { startDate, endDate } = useMemo(() => {
    switch (filter) {
      case "week": {
        return {
          startDate: date.startOf("week"),
          endDate: date.endOf("week"),
        };
      }

      case "month": {
        return {
          startDate: date.startOf("month"),
          endDate: date.endOf("month"),
        };
      }

      case "year": {
        return {
          startDate: date.startOf("year"),
          endDate: date.endOf("year"),
        };
      }

      default: {
        return {
          startDate: dayjs().startOf("month"),
          endDate: dayjs().endOf("month"),
        };
      }
    }
  }, [date, filter]);

  const { data: statistics, isLoading } = useQuery({
    queryKey: [
      "STATISTICS",
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD"),
    ],
    queryFn: () =>
      api.get("/dashboard", {
        params: {
          start_date: startDate.format("YYYY-MM-DD"),
          end_date: endDate.format("YYYY-MM-DD"),
        },
      }),
    enabled: !!startDate && !!endDate,
    placeholderData: keepPreviousData,
  });

  const getOrderStatusData = () => {
    if (!statistics?.orders) return [];

    return Object.entries(statistics?.orders).map(([status, count], index) => ({
      key: index,
      status,
      count,
    }));
  };

  const getMonthlyRevenueChartData = () => {
    if (!statistics?.monthly_revenue) return null;

    const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const data = [];
    const labels = [];

    for (let i = 1; i <= 12; i++) {
      labels.push(monthNames[i - 1]);
      data.push(statistics.monthly_revenue[i] || 0);
    }

    return {
      labels,
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Doanh thu theo tháng",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${formatPrice(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: window.innerWidth < 768 ? 45 : 0,
          minRotation: window.innerWidth < 768 ? 45 : 0,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return formatPrice(value);
          },
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
    },
  };

  const orderColumns = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
  ];

  const renderDatePicker = () => {
    const disableFutureDates = (current) => {
      return current && current > dayjs().endOf("day");
    };

    switch (filter) {
      case "week":
        return (
          <DatePicker
            value={date}
            onChange={setDate}
            picker="week"
            disabledDate={disableFutureDates}
          />
        );
      case "month": {
        return (
          <DatePicker
            value={date}
            onChange={setDate}
            picker="month"
            allowClear={false}
            disabledDate={disableFutureDates}
          />
        );
      }
      case "year":
        return (
          <DatePicker
            value={date}
            onChange={setDate}
            picker="year"
            allowClear={false}
            disabledDate={disableFutureDates}
          />
        );
      default:
        return null;
    }
  };

  const monthlyRevenueData = getMonthlyRevenueChartData();

  if (isLoading) {
    return <Spin />;
  }

  return (
    <ConfigProvider locale={viVN}>
      <Flex
        align="center"
        className="tw-mb-2"
        gap="12px"
        wrap="wrap"
        justify="space-between"
      >
        <h1 className="tw-text-2xl tw-font-semibold tw-text-black tw-font-[inherit]">
          Thống kê
        </h1>

        <Flex gap="12px" align="center" wrap="wrap">
          <Radio.Group
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <Radio.Button value="week">Tuần</Radio.Button>
            <Radio.Button value="month">Tháng</Radio.Button>
            <Radio.Button value="year">Năm</Radio.Button>
          </Radio.Group>

          {renderDatePicker()}
        </Flex>
      </Flex>

      <Row gutter={[8, 8]} className="tw-mb-2">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={statistics?.total_revenue || 0}
              formatter={(value) => formatPrice(value)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={statistics?.total_orders || 0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng người dùng"
              value={statistics?.total_user || 0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng sản phẩm"
              value={statistics?.total_product || 0}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Biểu đồ doanh thu theo tháng" className="tw-mb-2 tw-mt-2">
        {monthlyRevenueData && (
          <div style={{ height: window.innerWidth < 768 ? "400px" : "500px" }}>
            <Bar data={monthlyRevenueData} options={chartOptions} />
          </div>
        )}
      </Card>

      <Card title="Trạng thái đơn hàng" className="tw-mb-2">
        <Table
          dataSource={getOrderStatusData()}
          columns={orderColumns}
          pagination={false}
        />
      </Card>

      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Tổng thương hiệu"
              value={statistics?.total_brand || 0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Thời gian thống kê"
              value={`${dayjs(statistics?.start_date).format(
                "DD/MM/YYYY"
              )} đến ${dayjs(statistics?.end_date).format("DD/MM/YYYY")}`}
            />
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default Dashboard;
