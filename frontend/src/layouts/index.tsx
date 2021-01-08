import React, { useState } from 'react';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
export default (props) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(
    undefined,
  );
  const [pathname, setPathname] = useState('/welcome');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        fixSiderbar
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              console.log('item=>', item);
              console.log('dom=>', dom);
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        {...settings}
      >
        <PageContainer>
          <div>hi</div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
