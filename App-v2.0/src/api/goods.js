import Request from '@/utils/request';

// 获取商品
export const getGoods = (options) => {
  return Request({
    url: '/goods',
    method: 'GET',
    data: { ...options },
  });
};


// 获取商品详情
export const getDetails = (options) => {
  return Request({
    url: '/shop',
    method: 'GET',
    data: { ...options },
  });
};