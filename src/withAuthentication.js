// @flow
import React from 'react';
import {connect} from 'react-redux';
import {actions} from './redux/auth';
import type {Store} from './redux/types';

type Props = {
  loggedIn: boolean,
  authenticate: () => void,
  authenticationInProgress: boolean,
};

export default function withAuthentication<P: *>(Wrapped: ReactClass<P>) {
  class Authenticated extends React.Component {
    props: Props;

    ensureAuthentication = (props: Props) => {
      const {authenticationInProgress, authenticate} = props;
      if (!authenticationInProgress) {
        authenticate();
      }
    };

    componentDidMount() {
      this.ensureAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps: Props) {
      if (nextProps.location !== this.props.location)
        this.ensureAuthentication(nextProps);
    }

    render() {
      if (this.props.loggedIn) return <Wrapped {...this.props} />;
      return <div>authenticating...</div>;
    }
  }

  const mapStateToProps = ({auth}: Store) => ({
    ...auth,
  });

  const mapDispatchToProps = {
    ...actions,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticated);
}
