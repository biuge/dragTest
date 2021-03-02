import React, { useRef } from 'react';
import getColumnSearchProps from './filterComponents.js';

const Columns = props => {
  return [
    { title: '创建时间', dataIndex: 'id', width: '260' },
    { title: '订单号2', dataIndex: 'title', width: '260' },
    { title: '订单号3', dataIndex: 'data3', width: '260' },
    { title: '订单号4', dataIndex: 'data4', width: '260' },
    { title: '订单号5', dataIndex: 'data5', width: '260' },
    { title: '订单号6', dataIndex: 'data6', width: '260' },
    { title: '订单号7', dataIndex: 'data7', width: '260' },
    { title: '订单号8', dataIndex: 'data8', width: '260' },
    { title: '订单号9', dataIndex: 'data9', width: '260' },
    { title: '订单号10', dataIndex: 'data10', width: '260' },
    { title: '订单号11', dataIndex: 'data11', width: '260' },
    { title: '订单号12', dataIndex: 'data12', width: '260' },
    { title: '订单号13', dataIndex: 'data13', width: '260' },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'btn',
      width: '260',
      render: (_, records) => {
        return <div>123</div>;
      },
    },
  ].map(i => {
    const ext = getColumnSearchProps(i.dataIndex, console.log, console.log);
    return {
      ...i,
      ...ext,
    };
  });
};

export { Columns };
