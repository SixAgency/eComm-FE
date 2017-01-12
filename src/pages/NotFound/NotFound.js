import React from 'react';
import Link from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';

class NotFound extends React.Component {

  render() {
    return (
      <section className={s.container}>
        <section className={s.cwrpr}>
          <div className={s.content}>
            <article>
              <div className={s.cbody}>
                <h2 className={s.errtitle}> Uh oh! (404 Error)</h2>
                <div>
                  <h4
                    className={s.errcontent}
                  >
                    We are really sorry but the page you requested is missing :(
                  </h4>
                </div>
                <Link
                  to="/"
                  className={s.goback}
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

export default withStyles(s)(NotFound);
