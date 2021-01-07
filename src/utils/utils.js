/**
 * 默认值处理
 * @param   {any}     value 初始值
 * @param   {String}    template 要处理成何种数据
 * @param   {String}    emptyValueDef 空值的默认显示
 * @return  {String}    处理完的字符串
 */
export const valueOperate = (
  value,
  template = 'defaultValue',
  emptyValueDef = '-',
) => {
  if (!value) {
    return emptyValueDef;
  }
  if (value === 'NaN' || value === 'undefined' || value === 'null') {
    return emptyValueDef;
  }
  const newValue = typeof value === 'string' ? Number(value) : value;

  const templateMap = {
    元: `${new BigNumber(newValue).toFixed(2)}元`,
    万元: `${newValue}万元`,
    '¥': `${
      new BigNumber(newValue) >= 0
        ? `¥${new BigNumber(newValue).toFixed(2)}`
        : `-¥${Math.abs(new BigNumber(newValue).toFixed(2))}`
    }`,
    '%': `${new BigNumber(newValue * 100).toFixed(2)}%`,
    元方: `${new BigNumber(newValue).toFixed(2)}元/方`,
    元吨: `${new BigNumber(newValue).toFixed(2)}元/吨`,
    元趟: `${new BigNumber(newValue).toFixed(2)}元/趟`,
    元车: `${new BigNumber(newValue).toFixed(2)}元/车`,
    趟: `${newValue}趟`,
    方: `${new BigNumber(newValue).decimalPlaces(3).toString()}方`,
    吨: `${new BigNumber(newValue).decimalPlaces(3).toString()}吨`,
    车: `${newValue}车`,
    '‰': `${newValue}‰`,
    defaultValue: value,
  };
  return templateMap[template];
};
