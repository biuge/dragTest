import React, { useImperativeHandle } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { withRouter } from 'react-router-dom';
import {
  useUpdateEffect,
  useFormTable,
  useLocalStorageState,
} from '@umijs/hooks';
import { connect } from 'dva';
import { Table } from 'antd';
import { valueOperate } from '../utils/utils.js';
import { DragTableProps } from './config/interface';
import HOCDndProvider from './config/hocDND.js';
import * as DragTableStyle from './index.less';

export const TableContext = React.createContext(null);

const DragTableHooks: React.FC<DragTableProps> = props => {
  const {
    form,
    rowSelection,
    rowKey,
    history,
    isSearch,
    isDrag,
    tableRef,
    service,
    serviceParams,
    tableClassName,
    type,
    columns,
    CorrelationFun,
    bordered = true,
    tableParams,
  } = props;

  const [keyColumns, setColumns] = useLocalStorageState(type, columns || []);

  const localColumnsSorting = (columns, keyColumns) => {
    if (
      !(keyColumns instanceof Array) ||
      !keyColumns ||
      keyColumns.length === 0 ||
      keyColumns.length !== columns.length
    )
      return columns; // 没有本地columns 或者 对不上
    const arr = keyColumns.map(k => {
      return columns.find(i => i.title === k.title);
    });
    return arr.filter(i => i);
  };
  const sortColumns = localColumnsSorting(columns, keyColumns);
  sortColumns.map(i => {
    if (typeof i.render === 'undefined') {
      i.render = _ => {
        return <div style={{ whiteSpace: 'nowrap' }}>{_}</div>;
      };
    }
  });
  const { tableProps, search, run, pagination, mutate, refresh } = useFormTable(
    service,
    serviceParams,
  );
  const { submit, reset } = search;

  useImperativeHandle(tableRef, () => ({
    submit: () => submit(),
    reset: () => reset(),
    mutate,
    refresh,
    tableProps,
  }));

  useUpdateEffect(() => {
    const formData = form.getFieldsValue();
    run({ current: 1, pageSize: tableParams?.pageSize ?? 10 });
  }, [isSearch]);

  // 拆入位置函数
  const moveCol = (dragIndex, hoverIndex) => {
    function swapArray(arr, index1, index2) {
      const drag = arr[index1];
      arr.splice(index1, 1);
      arr.splice(index2, 0, drag);
      return arr;
    }
    const newColumns = swapArray(columns, dragIndex, hoverIndex);
    setColumns([].concat(newColumns));
  };

  // 拖拽headComponents处理
  const DragableHeadRow = ({ children }) => {
    // 过滤掉 勾选和fixed定位col
    const filerChildren = children.filter(
      i => i.key !== 'selection-column' && i.key !== 'btn',
    );

    const Ths = filerChildren.map((th, index) => {
      const {
        props: { className, style, children: thChildren },
      } = th;

      const ref = React.useRef();
      const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
          const { index: dragIndex } = monitor.getItem() || {};
          if (dragIndex === index) {
            return {};
          }
          return {
            isOver: monitor.isOver(),
            dropClassName:
              dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
          };
        },
        drop: item => {
          moveCol(item.index, index);
        },
      });
      const [, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      });

      drop(drag(ref));

      const cloneTh = React.cloneElement(
        th,
        {
          ...th.props,
          ref,
          className: `${className} ${isOver ? dropClassName : ''}`,
          style: { cursor: 'move', ...style },
        },
        thChildren,
      );
      return cloneTh;
    });
    if (children[0].key === 'selection-column') {
      Ths.unshift(children[0]);
    }
    if (children[children.length - 1].key === 'btn') {
      Ths.push(children[children.length - 1]);
    }
    return <tr>{Ths}</tr>;
  };

  // 判断是否需要拖拽
  const components = {
    header: {
      row: props => {
        // return <DndProvider backend={HTML5Backend}><DragableHeadRow {...props} /></DndProvider>
        return (
          <HOCDndProvider>
            <DragableHeadRow {...props} />
          </HOCDndProvider>
        );
      },
    },
  };

  // pagin设置
  tableProps.pagination.showTotal = total =>
    `共${Math.ceil(total / pagination.pageSize)}页/${total}条`;
  tableProps.pagination.showSizeChanger = tableParams?.showSizeChanger || false;
  tableProps.pagination.pageSizeOptions = tableParams?.pageSizeOptions || [
    10,
    20,
    50,
    100,
  ];
  tableProps.pagination.defaultPageSize = tableParams?.pageSize ?? 10;
  const dataSource = tableProps.dataSource || [];

  return (
    // 剥离config 按钮逻辑操作提供上下文环境
    <TableContext.Provider
      value={{
        submit,
        history,
        mutate,
        search,
        refresh,
        CorrelationFun,
      }}
    >
      <Table
        {...tableProps}
        {...tableParams}
        dataSource={dataSource}
        className={DragTableStyle.dropDragTable}
        bordered={bordered}
        rowSelection={rowSelection}
        columns={sortColumns}
        rowKey={rowKey}
        size="small"
        components={isDrag ? components : {}}
      />
    </TableContext.Provider>
  );
};
export default DragTableHooks;
