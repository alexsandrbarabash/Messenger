import { Component } from 'react';

import { ErrorIndicator } from 'components';

export class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  state = {
    hasError: false
  };

  constructor(props: any) {
    super(props);
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState(({ hasError }) => ({
      hasError: true
    }));
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}
