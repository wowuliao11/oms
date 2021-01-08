import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/layouts/index' },
    //指向 src 目录的文件以 @ 或../开头
    {
      path: '/manage',
      component: '@/layouts/manu',
      routes: [
        {
          path: '/manage/order',
          component: '@/pages/order-manage/page_order',
          exact: true,
        }, //path依然针对于站点的根目录
      ],
    },
  ],
});
