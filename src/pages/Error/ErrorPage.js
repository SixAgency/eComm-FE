import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.css';

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.object
  };

  render() {
    // if (process.env.NODE_ENV !== 'production') {
    //   const { error } = this.props;
    //   return (
    //     <div>
    //       <h1>{error.name}</h1>
    //       <p>{error.message}</p>
    //       <pre>{error.stack}</pre>
    //     </div>
    //   );
    // }

    return (
      <section className={s.container}>
        <section className={s.cwrpr}>
          <div className={s.content}>
            <article>
              <div className={s.cbody}>
                <h2 className={s.errtitle}> Uh oh! (500 Error)</h2>
                <div>
                  <h4
                    className={s.errcontent}
                  >
                    Server Error. Please contact your server administrator.
                  </h4>
                </div>
                <Link
                  className={s.goback}
                  to="/"
                >
                  ← Go Back
                </Link>
              </div>
            </article>
          </div>
        </section>
      </section>
    );
  }
}

export default withStyles(s)(ErrorPage);
export { ErrorPage as ErrorPageWithoutStyle };
