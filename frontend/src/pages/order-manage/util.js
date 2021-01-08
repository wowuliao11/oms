import axios from 'axios';
import { Dropdown, Icon, Menu, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const staticColumns = [
  {
    title: '订单号',
    fixed: 'left',
    dataIndex: 'order_id',
  },
  {
    title: '销售日期',
    dataIndex: 'sale_date',
  },
  {
    title: '城市',
    dataIndex: 'city',
  },
  {
    title: '物料名称',
    dataIndex: 'material',
  },
  {
    title: '下单数量',
    dataIndex: 'order_number',
  },
  {
    title: '备货数量',
    dataIndex: 'goods_number',
  },
  {
    title: '订单欠货总量',
    dataIndex: 'missing_number',
  },
  {
    title: '业务类型',
    dataIndex: 'biz_type',
  },
  {
    title: '合同组织',
    dataIndex: 'organization',
  },
  {
    title: '申请人',
    dataIndex: 'apply',
  },
  {
    title: '客户名称',
    dataIndex: 'customer',
  },
  {
    title: '收件人信息',
    dataIndex: 'reci_info',
  },
  {
    title: '销售价格税率',
    dataIndex: 'tax_rate',
  },
  {
    title: '销售单价',
    dataIndex: 'price',
  },
  {
    title: '淘宝订单号',
    dataIndex: 'tb_id',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
];
const hd_btnAction = {};
