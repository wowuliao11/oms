import React, { useState } from 'react';
import ProForm, {
  ProFormDatePicker,
  ProFormSelect,
  ProFormDigit,
} from '@ant-design/pro-form';
import axios from 'axios';
import { connect } from 'dva';
import config from './config.json';
import { Form, Input, notification, Button } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const ModifyPage = ({ history, dispatch, order_manage }) => {
  const { record } = order_manage;
  console.log('rec=>', record);
  const [iptErr, set_iptErr] = useState('');
  return (
    <React.Fragment>
      <Button
        style={{ marginBottom: '15px' }}
        icon={<LeftCircleOutlined />}
        onClick={() => history.push('/manage/order')}
      >
        返回订单管理页
      </Button>
      <div
        style={{
          padding: 24,
          background: '#fff',
        }}
      >
        <ProForm
          name="validate_other"
          initialValues={record}
          // onValuesChange={(_, values) => {
          //   console.log(values);
          // }}
          onFinish={async (value) => {
            const response = await axios.post(
              config.apiEndpoint + config.order.add,
              JSON.stringify(value),
            );
            if (response.data.errFlag) {
              await set_iptErr(response.data.errMessage);
              notification['error']({
                message: '抱歉,请仔细核对信息填写',
                description: response.data.errMessage,
              });
            } else {
              await notification.success({
                message: '创建订单成功',
                description: '已为您跳转至订单管理页',
              });
              history.replace('/manage/order');
            }
          }}
        >
          <ProForm.Group title="*必填-订单信息">
            <ProFormDatePicker
              name="sale_date"
              defaultValue={record.sale_date}
              label="销售日期"
              rules={[{ required: true, message: '请选择销售日期' }]}
            />
            <ProFormSelect
              width="md"
              request={async () => [
                { label: '销售', value: '销售' },
                { label: '租凭', value: '租凭' },
                { label: '借用', value: '借用' },
                { label: '推广', value: '推广' },
              ]}
              name="business_type"
              label="业务类型"
              rules={[{ required: true, message: '请选择业务类型' }]}
            />
            <ProFormDigit
              label="备货数量"
              name="stock_number"
              min={1}
              max={9999}
              rules={[{ required: true, message: '请输入1~9999范围的数字' }]}
            />
            <ProFormDigit
              label="下单数量"
              name="order_number"
              min={1}
              max={9999}
              rules={[{ required: true, message: '请输入1~9999范围的数字' }]}
            />
          </ProForm.Group>

          <ProForm.Group title="*必填-合同信息">
            <Form.Item
              name="apply"
              label="申请人"
              rules={[{ required: true, message: '请输入申请人' }]}
            >
              <Input maxLength={10} />
            </Form.Item>

            <Form.Item
              name="customer"
              label="客户名称"
              rules={[{ required: true, message: '请输入客户名称' }]}
            >
              <Input maxLength={20} />
            </Form.Item>

            <ProFormSelect
              width="xs"
              placeholder="请选择"
              request={async () => [
                { label: '德百祺', value: '德百祺' },
                { label: '领翌', value: '领翌' },
              ]}
              name="organization"
              label="合同组织"
              rules={[{ required: true, message: '请选择合同组织' }]}
            />
            <Form.Item
              name="recipents_info"
              label="收件人信息"
              rules={[{ required: true, message: '请输入收件人信息' }]}
            >
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                showCount
                maxLength={60}
              />
            </Form.Item>
          </ProForm.Group>

          <ProForm.Group title="选填信息">
            <ProFormDigit
              label="销售价格税率(%)(选填)"
              placeholder="0~100"
              name="tax_rate"
              min={0}
              max={100}
            />
            <ProFormDigit
              label="销售单价(选填)"
              name="price"
              min={1.0}
              max={9999.0}
            />

            <Form.Item name="tb_id" label="淘宝订单号(选填)">
              <Input maxLength={30} />
            </Form.Item>
            <Form.Item name="remarks" label="备注(选填)">
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                showCount
                maxLength={60}
              />
            </Form.Item>
          </ProForm.Group>
        </ProForm>
      </div>
    </React.Fragment>
  );
};

export default connect((paraIn) => {
  return { order_manage: paraIn['order-manage'] };
})(ModifyPage);
