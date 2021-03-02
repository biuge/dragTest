import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Select,
  Tabs,
  Icon,
  Upload,
  message,
  Modal,
  Radio,
} from 'antd';

const getColumnSearchProps = (dataIndex, handleSearch, handleReset) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          this.searchInput = node;
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      : '',
  onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => this.searchInput.select(), 100);
    }
  },
  render: text =>
    this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});
export default getColumnSearchProps;
