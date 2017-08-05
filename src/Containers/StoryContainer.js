// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {Store} from '../redux/types';
import Story from '../components/Story';

class StoryContainer extends Component {
  props: Props;

  componentDidMount() {
    console.log(`Story api call with token: ${this.props.token}`);
  }

  render() {
    const {user} = this.props;

    return <Story user={user} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
