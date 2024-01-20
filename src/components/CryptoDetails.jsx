import React from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useState } from "react";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import {
  MoneyCollectOutlined,
  FundOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  console.log(cryptoDetails);

  if (!cryptoDetails) {
    return <div>Loading...</div>; // или другое состояние ожидания
  }

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Col className="coin_container">
        <Col className="coin_heading">
          <Title level={2} className="coin_name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>
            {cryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply.
          </p>
        </Col>
      </Col>
      <Select
        defaultValue="7D"
        className="select_time_period"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <Col className="stats_container">
        <Col className="coin_value_statistics">
          <Col className="coin_head_statistics">
            <Title level={3}>{cryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
        </Col>
      </Col>
      {stats.map(({ icon, title, value }) => (
        <Col className="coin_stats">
          <Col className="stats_name">
            <Text>{icon}</Text>
            <Text>{title}</Text>
          </Col>
          <Text className="stats">{value}</Text>
        </Col>
      ))}
    </>
  );
};

export default CryptoDetails;
