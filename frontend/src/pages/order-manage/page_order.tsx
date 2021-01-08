import React, { useRef, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  ModalForm,
  QueryFilter,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { Button, Space, Menu, Dropdown, Form, Input, message } from 'antd';
import ProTable from '@ant-design/pro-table';

import {
  DownOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

import { staticColumns } from './util';
import config from './config.json';
import { Modal, DatePicker, Table, Icon } from 'antd';
import { Link } from 'umi';
const { confirm } = Modal;
const { RangePicker } = DatePicker;

export default ({ order, history }) => {
  const actionRef = useRef();
  const [dates, setDates] = useState([]);
  const [IptValue, setIptValue] = useState('');
  const [hackValue, setHackValue] = useState();
  const [RangePickerValue, setRangePickerValue] = useState([]);
  const [reload, setReload] = useState({
    do: true,
    method: 'POST',
    url: config.apiEndpoint + config.order.fetchData,
    data: null,
  });
  const [batchAddError, setBatchAddError] = useState(null);
  const [showErrList, setShowErrList] = useState(false);
  /*---------- START => batch action button -----------*/
  const hd_btnAction = {
    '@delete': () =>
      confirm({
        title: '批量删除',
        icon: <ExclamationCircleOutlined />,
        content: '点击"确定"将选中的订单记录从账号下移除',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      }),
    '@output': () =>
      confirm({
        title: '批量导出',
        icon: <ExclamationCircleOutlined />,
        content: '当前选中的设备生成EXCEL文件,导出至本地',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      }),
    delete: () =>
      confirm({
        title: '批量删除',
        icon: <ExclamationCircleOutlined />,
        content: '点击"确定"将选中的订单记录从账号下移除',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      }),
    output: () =>
      confirm({
        title: '批量导出',
        icon: <ExclamationCircleOutlined />,
        content: '当前选中的设备生成EXCEL文件,导出至本地',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      }),
    look: () => {
      console.log('跳转look');
    },
    send: () => {
      console.log('跳转send');
    },
    modify: (record) => {
      console.log('modify record =>', record);
      console.log('跳转modify');
    },
  };
  const batchMenu = (
    <Menu>
      <Menu.Item>
        <ModalForm
          width={600}
          title="批量创建"
          trigger={<Button key="@add">创建订单</Button>}
          modalProps={{
            onCancel: () => console.log('run'),
            okText: showErrList ? '重新上传' : '确定上传',
          }}
          onFinish={async (values) => {
            if (!showErrList && batchAddError) {
              setShowErrList(true);
            } else if (showErrList && batchAddError) {
              setShowErrList(false);
              return false;
            } else if (!showErrList && !batchAddError) {
              setReload({ ...reload, do: !reload.do });
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true);
                }, 300);
              });
              message.success('提交成功');
              return true;
            }
          }}
        >
          {!showErrList && (
            <React.Fragment>
              <Form.Item label="选择文件">
                <ProFormUploadButton
                  name="upload"
                  title="上传文件"
                  max={1}
                  action={config.apiEndpoint + config.order['@add']}
                  onChange={({ file }) => {
                    if (file.response) {
                      file.response.errorFlag
                        ? setBatchAddError(
                            file.response.errList.map(
                              (i: any, idx: Number) => ({
                                ...i,
                                key: idx,
                              }),
                            ),
                          )
                        : setBatchAddError(null);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="下载模板">
                <Button type="primary" icon={<DownloadOutlined />}>
                  下载模板
                </Button>
              </Form.Item>
            </React.Fragment>
          )}
          {showErrList && (
            <Table
              columns={[
                { title: '行数', dataIndex: 'row' },
                { title: '错误原因', dataIndex: 'message' },
              ]}
              dataSource={batchAddError}
            />
          )}
        </ModalForm>
      </Menu.Item>
      <Menu.Item key="@output">
        <Button onClick={() => hd_btnAction['@output']()}>批量导出</Button>
      </Menu.Item>
      <Menu.Item key="@delete">
        <Button onClick={() => hd_btnAction['@delete']()}>批量删除</Button>
      </Menu.Item>
    </Menu>
  );
  /*---------- END => batch action button -----------*/
  const columns = [
    ...staticColumns,
    {
      title: '附件',
      valueType: 'option',
      render: ({ props }) => [
        <a
          key="download"
          onClick={async () => {
            try {
              await axios.post(
                'https://mock-server.dbjtech.com/mock/5fed68fc8d66e30020e15692/order/upload',
                JSON.stringify({ order_id: props.text.order_id }),
                {
                  responseType: 'arraybuffer',
                },
              );
            } catch (ex) {
              console.log(ex);
            }
          }}
        >
          下载
        </a>,
      ],
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: ({ props }) => {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="modify"
                  onClick={() => hd_btnAction.modify(props.text)}
                >
                  <Link to={'/manage/order/single/modify'}>修改</Link>
                </Menu.Item>
                <Menu.Item key="send" onClick={() => hd_btnAction.send()}>
                  <Link to={'/manage/order/single/send'}> 发货</Link>
                </Menu.Item>
                <Menu.Item key="output" onClick={() => hd_btnAction.output()}>
                  导出
                </Menu.Item>
                <Menu.Item key="look" onClick={() => hd_btnAction.look()}>
                  <Link to={'/manage/order/single/look'}>查看发货订单</Link>
                </Menu.Item>
                <Menu.Item key="delete" onClick={() => hd_btnAction.delete()}>
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              选择操作 <Icon type="down" />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <QueryFilter
        defaultCollapsed={false}
        onReset={() => {
          setRangePickerValue([]);
          setIptValue('');
        }}
        onFinish={async () => {
          let pld = {
            order: IptValue,
            range: RangePickerValue.map((m) => moment(m).format('YYYY-MM-DD')),
          };

          if (!IptValue) delete pld.order;
          if (RangePickerValue.length === 0) delete pld.range;
          console.log('payload=>', pld);
          setReload({ ...reload, data: pld });
        }}
      >
        <Form.Item label="订单号">
          <Input
            placeholder="请输入一个或多个订单号,空格隔开"
            value={IptValue}
            onChange={(e) => setIptValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="销售时间区间">
          <RangePicker
            value={hackValue || RangePickerValue}
            disabledDate={(current) => {
              if (!dates || dates.length === 0) {
                return false;
              }
              const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
              const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
              return tooEarly || tooLate;
            }}
            onCalendarChange={(val) => setDates(val)}
            onChange={(val) => setRangePickerValue(val)}
            onOpenChange={(open) => {
              if (open) {
                setHackValue([]);
                setDates([]);
              } else {
                setHackValue(undefined);
              }
            }}
          />
        </Form.Item>
      </QueryFilter>

      <ProTable
        search={false}
        columns={columns}
        params={reload}
        request={async () => {
          const response = await axios(reload);
          const data = response.data.data.map((item, idx) => ({
            ...item,
            key: idx,
          }));
          return { data, success: true };
        }}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys }) => (
          <Space size={24}>
            <span>已选 {selectedRowKeys.length} 项</span>
          </Space>
        )}
        rowKey="key"
        actionRef={actionRef}
        tableLayout="fixed"
        pagination={{
          pageSize: 5,
        }}
        options={{
          fullScreen: true,
          reload: false,
          setting: true,
          density: true,
        }}
        scroll={{ x: 1800 }}
        toolbar={{
          menu: {
            type: 'inline',
            items: [
              {
                key: 'new',
                label: (
                  <Button
                    type="primary"
                    onClick={() => history.push('/manage/order/single/add')}
                  >
                    <PlusOutlined />
                    创建
                  </Button>
                ),
              },
              {
                key: 'action',
                label: (
                  <Dropdown overlay={batchMenu}>
                    <Button>
                      批量操作 <DownOutlined />
                    </Button>
                  </Dropdown>
                ),
              },
            ],
          },
        }}
      />
    </div>
  );
};
