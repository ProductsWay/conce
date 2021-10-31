import { Component, ReactNode } from "react";

import logger from "./logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: Record<string, any>) {
    logger.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <section className="text-gray-600 body-font">
          <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
            <div className="w-full text-center lg:w-2/3">
              <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">Opppss..</h1>
              <p className="mb-8 leading-relaxed">Something has gone wrong.</p>
              <div className="flex justify-center">
                <a
                  href="/"
                  className="inline-flex px-6 py-2 text-lg text-white bg-green-500 border-0 rounded focus:outline-none hover:bg-green-600"
                >
                  Return to Dashboard
                </a>
              </div>
            </div>
          </div>
        </section>
      );
    }
    return children;
  }
}
