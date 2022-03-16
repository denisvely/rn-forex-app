import React, { Component } from "react";
import { FlatList, SafeAreaView } from "react-native";
import PropTypes from "prop-types";

export class LazyFlatList extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();

    this.state = {
      list: props.list,
    };
  }

  componentDidUpdate(prevProps) {
    const { list } = this.props;

    if (list && list !== prevProps.list) {
      this.setState({
        list: list,
      });
    }
  }

  render() {
    const { list } = this.state;
    const { cut, listRef } = this.props;

    return (
      // SafeAreaView prevents moving flatlist by X axis
      <SafeAreaView>
        <FlatList
          removeClippedSubviews={true}
          initialNumToRender={cut}
          windowSize={100}
          maxToRenderPerBatch={7}
          refreshing={true}
          updateCellsBatchingPeriod={100}
          data={list}
          horizontal={false}
          ref={listRef}
          {...this.props}
        />
      </SafeAreaView>
    );
  }
}

LazyFlatList.defaultProps = {
  cut: 7,
  showsHorizontalScrollIndicator: false,
};

LazyFlatList.propTypes = {
  attributes: PropTypes.object,
  cut: PropTypes.number,
  list: PropTypes.array.isRequired,
  showsHorizontalScrollIndicator: PropTypes.bool,
};

export default LazyFlatList;
