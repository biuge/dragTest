## Foo

Demo:

```tsx
import React, { useState, useRef, Fragment } from 'react';
// import { DragTable } from 'lytcomponents';
import DragTable from './index';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  Select,
  Tabs,
  Icon,
  Upload,
  message,
  Modal,
  Radio,
} from 'antd';
import { Columns } from './config/config.js';
const Demo = () => {
  const tableRef = useRef();
  const [form] = Form.useForm();
  const dataSource = [
    {
      id: 1,
      title: 'Ant Design Title 1',
    },
    {
      id: 2,
      title: 'Ant Design Title 2',
    },
    {
      id: 3,
      title: 'Ant Design Title 3',
    },
    {
      id: 4,
      title: 'Ant Design Title 4',
    },
    {
      id: 5,
      title: 'Ant Design Title 5',
    },
    {
      id: 6,
      title: 'Ant Design Title 6',
    },
    {
      id: 7,
      title: 'Ant Design Title 7',
    },
    {
      id: 8,
      title: 'Ant Design Title 8',
    },
    {
      id: 9,
      title: 'Ant Design Title 9',
    },
    {
      id: 10,
      title: 'Ant Design Title 10',
    },
  ];
  const getTableData = ({ current, pageSize }, formData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: dataSource.length,
          list: dataSource,
        });
      }, 1000);
    });
  };

  const tableParams = {
    tableRef,
    form,
    columns: Columns(),
    isDrag: true,
    type: 'drag-OrderList-table1',
    rowKey: 'id',
    tableParams: {
      scroll: { x: true },
    },
    service: getTableData,
    CorrelationFun: {},
    serviceParams: {
      manual: false,
      form,
      paginated: true,
      formatResult: response => {
        return response;
      },
    },
  };
  return (
    <>
      <Form name="control-ref">
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
      <DragTable {...tableParams} />
    </>
  );
};
export default Demo;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
