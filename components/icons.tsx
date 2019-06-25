import * as React from 'react';

interface Props {
  className?: string;
}

const Icon = (iconName: string) => class extends React.Component<Props> {
  render() {
    const className = `${this.props.className ? this.props.className : ''} lnr lnr-${iconName}`;
    return <span className={className}/>;
  }
};

/**
 * Requires Linear Icons stylesheet, available at
 * https://linearicons.com/free
 */
export const CrossIcon = Icon('cross');

/**
 * Requires Linear Icons stylesheet, available at
 * https://linearicons.com/free
 */
export const LinkIcon = Icon('link');

/**
 * Requires Linear Icons stylesheet, available at
 * https://linearicons.com/free
 */
export const MapIcon = Icon('map');
