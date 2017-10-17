import { Component } from 'react';
import { connect } from 'react-redux';

class Recherche extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    showAddPost: '',
    test: '',
  };
}

export default connect(mapStateToProps)(Recherche);
