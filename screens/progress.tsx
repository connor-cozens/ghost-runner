import * as React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';

const progress = () => (
  <ProgressBar progress={0.5} color={Colors.red800} />
);

export default progress;