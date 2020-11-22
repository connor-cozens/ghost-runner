// This code was forked from: https://github.com/kis/react-native-air-progress-bar/blob/master/index.js
// and adapted to the needs of our program. Mainly to deal with outdated dependencies.
// 
// We claim no rights to any copyright or published work.
import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');
const BAR_MARGIN = 30;
const RATIO = (WIDTH - (BAR_MARGIN * 2)) / 110;

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    marginTop: 20
  },

  line: {
    position: 'absolute',
    width: WIDTH,
    top: 17,
    borderWidth: 1,
    borderColor: '#888888',
    alignSelf: 'flex-end',
  }
});

export default class ProgressBar extends Component {
  static propTypes = {
    icon: PropTypes.string,
    progress: PropTypes.number,
    initialProgress: PropTypes.number,
    additionalStyles: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ])
  }

  state = {
    activeSegmentAnim: new Animated.Value(this.props.initialProgress || 0),
    planeAnim: new Animated.Value(this.props.initialProgress || 0)
  }

  componentDidMount() {
    this.animate(this.props.progress);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.animate(nextProps.progress);
  }

  animate(progress) {
    const { activeSegmentAnim, planeAnim } = this.state;
    const activeSegmentWidth = RATIO * progress;

    Animated.parallel([
      Animated.timing(activeSegmentAnim, {
        toValue: activeSegmentWidth,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(planeAnim, {
        toValue: activeSegmentWidth,
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  }

  render() {
    const { progress, additionalStyles } = this.props;
    const { activeSegmentAnim, planeAnim } = this.state;

    const lineActive = {
      position: 'absolute',
      top: 17,
      borderWidth: 1,
      borderColor: '#888888',
      alignSelf: 'flex-start',
      transform: [{'translate':[0,0,1]}]
    };

    const planeStyles = {
      position: 'absolute',
      top: 0,
      transform: [{'translate':[0,0,1]}]
    };

    return (
      <View style={[styles.bar, {
        marginLeft: BAR_MARGIN,
        marginRight: BAR_MARGIN,
        width: WIDTH,
        // color: "#000000"
      }, additionalStyles]}>

        <View style={styles.line}></View>

        <Animated.View style={{
          ...lineActive,
          width: activeSegmentAnim,
          // color: "#000000"
        }}></Animated.View>

        <Animated.View style={{
          ...planeStyles,
          left: planeAnim
        }}>
          <Icon name={this.props.icon} size={35} color="#000000" />
        </Animated.View>

        

      </View>
    );
  }
}