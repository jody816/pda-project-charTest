import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Button, Form } from "react-bootstrap";
import JsonChartTest from "./ChartTest";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchGetStockData } from "../../lib/apis/stock";

export class ChartBlock {
  constructor({ data }) {
    this.data = data;
    this.nodes = {
      holder: null,
    };
  }

  static get toolbox() {
    return {
      title: "chart",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M3,21V0H0V21a3,3,0,0,0,3,3H24V21Z"/><rect x="18" y="9" width="3" height="9"/><rect x="6" y="9" width="3" height="9"/><rect x="12" y="4" width="3" height="14"/></svg>',
    };
  }

  render() {
    const rootNode = document.createElement("div");
    this.nodes.holder = rootNode;

    ReactDOM.createRoot(rootNode).render(<ChartModal />);
    return rootNode;
  }

  save(blockContent) {
    return {
      data: "testData",
    };
  }
}

const ChartModal = () => {
  const [show, setShow] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [formData, setFormData] = useState({
    marketCode: "J",
    stockCode: "",
    startDate: "",
    endDate: "",
    period: "",
    prc: "0",
  });

  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = async () => {
    // 입력 검증
    if (!formData.stockCode || !formData.startDate || !formData.endDate) {
      setError("종목 코드와 날짜는 필수 입력 항목입니다.");
      return;
    }

    try {
      const data = await fetchGetStockData(formData);
      setChartData(data);
      setShow(false);
    } catch (error) {
      console.error("Failed to fetch stock data", error);
    } finally {
      setShow(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>국내주식기간별시세(일/주/월/년)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group controlId="formMarketCode">
              <Form.Label>시장 분류 코드</Form.Label>
              <Form.Control
                type="text"
                placeholder="J (주식)"
                name="marketCode"
                value={formData.marketCode}
                // onChange={handleChange}
                disabled
              />
            </Form.Group> */}
            <Form.Group controlId="formStockCode">
              <Form.Label>종목 코드</Form.Label>
              <Form.Control
                type="text"
                placeholder="종목번호 (6자리)"
                name="stockCode"
                value={formData.stockCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>입력 날짜 (시작)</Form.Label>
              <Form.Control
                type="date"
                placeholder="조회 시작일자 (ex. 20220501)"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>입력 날짜 (종료)</Form.Label>
              <Form.Control
                type="date"
                placeholder="조회 종료일자 (ex. 20220530)"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPeriod">
              <Form.Label>기간 분류 코드</Form.Label>
              <Form.Select
                name="period"
                value={formData.period}
                onChange={handleChange}
              >
                <option value="D">일봉</option>
                <option value="W">주봉</option>
                <option value="M">월봉</option>
                <option value="Y">년봉</option>
              </Form.Select>
            </Form.Group>
            {/* <Form.Group controlId="formPcr">
              <Form.Label>수정주가 원주가 가격 여부</Form.Label>
              <Form.Control
                type="text"
                placeholder="0 (수정주가)"
                name="prc"
                value={formData.prc}
                // onChange={handleChange}
                disabled
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSave}>
            차트 그리기
          </Button>
        </Modal.Footer>
      </Modal>
      {chartData && <JsonChartTest stockData={chartData} />}
    </>
  );
};
