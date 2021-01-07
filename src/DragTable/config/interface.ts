import * as React from 'react';
import * as H from 'history';

import { FormComponentProps } from 'antd/lib/form';
import { TableRowSelection } from 'antd/lib/table/';

import { Dispatch } from 'redux';
import { number } from 'prop-types';

declare global {
  interface Window {
    open: (
      url?: string,
      target?: string,
      features?: string,
      replace?: boolean,
    ) => Window;
  }
}

interface PaginatedParams {
  current: number;
  pageSize: number;
  [key: string]: any;
}

export interface DragTableProps {
  form?: FormComponentProps.form;
  rowSelection?: TableRowSelection;
  rowKey: () => any | string;
  history?: H.History;
  isSearch?: boolean;
  isDrag?: boolean;
  tableRef?: React.MutableRefObject<any>;
  // 表格必填项 标识localstorage里key
  type?: string;
  // 表格请求
  service?: (
    Paginated: { current: Number; pageSize: Number },
    formData: Object,
  ) => void;
  // 表格配置项
  serviceParams?: {
    manual: boolean;
    form: FormComponentProps.form;
    paginated: boolean;
    formatResult: (response: any) => { total: Number; list: any[] };
  };
  [key: string]: any;
}
