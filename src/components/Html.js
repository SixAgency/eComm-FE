import React, { PropTypes, Component } from 'react';
import { analytics } from '../config';

class Html extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    ogImage: PropTypes.string,
    style: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.string,
    st: PropTypes.string
  };

  render() {
    const { title, description, ogImage, style, scripts, children, st } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{`${title} - krissorbie`}</title>
          <meta name="description" content={description || '...'} />
          <link rel="canonical" href="https://krissorbie.com/" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${title} - krissorbie`} />
          <meta property="og:description" content={description || '...'} />
          {ogImage && <meta property="og:image" content={ogImage} />}
          {ogImage && <meta property="og:image:width" content="960" />}
          {ogImage && <meta property="og:image:height" content="960" />}
          <meta property="og:url" content="https://krissorbie.com/" />
          <meta property="og:site_name" content="krissorbie" />
          <meta name="twitter:card" content="summary" />
          <meta property="twitter:description" content={description || '...'} />
          {ogImage && <meta property="twitter:image" content={ogImage} />}
          <meta name="twitter:title" content={`${title} - krissorbie`} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
          <link rel="shortcut icon" href="/assets/tile.png" />
          {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <div id="st">{st}</div>
          <script type="text/javascript" src="https://js.squareup.com/v2/paymentform" />
          {scripts && scripts.map(script => <script key={script} src={script} />)}
          {analytics.google.trackingId &&
            <script
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
            />
          }
          {analytics.google.trackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
        </body>
      </html>
    );
  }
}

export default Html;
