import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // 可选的自定义错误UI
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // 当子组件抛出错误时调用
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // 错误发生时的日志记录
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('错误边界捕获到错误：', error);
    console.error('错误详情：', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的错误 UI
      return this.props.fallback || (
        <div>
          <h1>出错了！</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 