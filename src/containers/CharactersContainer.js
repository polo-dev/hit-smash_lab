import {connect} from 'react-redux';
import Characters from '../components/Characters';
import {changeColor} from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    colors: state.colors
  };
};

const mapDispatchToProps = {
  changeColor
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Characters);

export default ListContainer;
