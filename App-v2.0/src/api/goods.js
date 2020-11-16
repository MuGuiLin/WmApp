import Request from '@/utils/request';

// 获取商品
export const getGoods = (options) => {
  return Request({
    url: '/goods',
    method: 'GET',
    data: { ...options },
  });
};