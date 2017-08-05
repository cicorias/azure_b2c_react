// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {Store} from '../redux/types';
import Home from '../components/Home';

class HomeContainer extends Component {
  props: Props;

  componentDidMount() {
    console.log(`Home api call with token: ${this.props.token}`);
  }

  render() {
    const {user} = this.props;

    return <Home user={user} />;
  }
}

type Props = {
  user: User,
  token: string,
};

const mapStateToProps = ({auth}: Store) => ({
  ...auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
