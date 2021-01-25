import React from 'react';
import TabsProvider from './TabsContext';

export interface TabsProps {
  className?: string;
  children: React.ReactNode;
}

const Tabs = ({ children, className }: TabsProps): React.ReactElement => {
  return (
    <div className={className}>
      <TabsProvider>{children}</TabsProvider>
    </div>
  );
};

export default Tabs;
